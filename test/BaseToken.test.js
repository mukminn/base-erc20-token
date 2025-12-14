const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BaseToken", function () {
  let baseToken;
  let owner;
  let addr1;
  let addr2;
  let initialSupply;

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();

    // Token configuration
    const tokenName = "Base Token";
    const tokenSymbol = "BASE";
    initialSupply = ethers.parseEther("1000000"); // 1,000,000 tokens

    // Deploy contract
    const BaseToken = await ethers.getContractFactory("BaseToken");
    baseToken = await BaseToken.deploy(tokenName, tokenSymbol, initialSupply);
    await baseToken.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right name and symbol", async function () {
      expect(await baseToken.name()).to.equal("Base Token");
      expect(await baseToken.symbol()).to.equal("BASE");
    });

    it("Should set the right owner", async function () {
      expect(await baseToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await baseToken.balanceOf(owner.address);
      expect(await baseToken.totalSupply()).to.equal(ownerBalance);
      expect(ownerBalance).to.equal(initialSupply);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseEther("100");
      
      // Transfer tokens from owner to addr1
      await baseToken.transfer(addr1.address, transferAmount);
      const addr1Balance = await baseToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(transferAmount);

      // Transfer tokens from addr1 to addr2
      await baseToken.connect(addr1).transfer(addr2.address, transferAmount);
      const addr2Balance = await baseToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(transferAmount);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await baseToken.balanceOf(owner.address);
      const transferAmount = initialOwnerBalance + ethers.parseEther("1");

      await expect(
        baseToken.connect(addr1).transfer(owner.address, transferAmount)
      ).to.be.revertedWithCustomError(baseToken, "ERC20InsufficientBalance");
    });

    it("Should update balances after transfers", async function () {
      const transferAmount = ethers.parseEther("100");
      const initialOwnerBalance = await baseToken.balanceOf(owner.address);

      await baseToken.transfer(addr1.address, transferAmount);
      await baseToken.transfer(addr2.address, transferAmount);

      const finalOwnerBalance = await baseToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - transferAmount - transferAmount);

      const addr1Balance = await baseToken.balanceOf(addr1.address);
      const addr2Balance = await baseToken.balanceOf(addr2.address);
      expect(addr1Balance).to.equal(transferAmount);
      expect(addr2Balance).to.equal(transferAmount);
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint new tokens", async function () {
      const mintAmount = ethers.parseEther("50000");
      const initialSupply = await baseToken.totalSupply();

      await baseToken.mint(addr1.address, mintAmount);

      const newSupply = await baseToken.totalSupply();
      const addr1Balance = await baseToken.balanceOf(addr1.address);

      expect(newSupply).to.equal(initialSupply + mintAmount);
      expect(addr1Balance).to.equal(mintAmount);
    });

    it("Should fail if non-owner tries to mint", async function () {
      const mintAmount = ethers.parseEther("50000");

      await expect(
        baseToken.connect(addr1).mint(addr1.address, mintAmount)
      ).to.be.revertedWithCustomError(baseToken, "OwnableUnauthorizedAccount");
    });
  });

  describe("Burning", function () {
    it("Should allow token holders to burn their tokens", async function () {
      const transferAmount = ethers.parseEther("100");
      const burnAmount = ethers.parseEther("50");

      // Transfer tokens to addr1
      await baseToken.transfer(addr1.address, transferAmount);

      // Burn tokens from addr1
      await baseToken.connect(addr1).burn(burnAmount);

      const addr1Balance = await baseToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(transferAmount - burnAmount);

      const totalSupply = await baseToken.totalSupply();
      expect(totalSupply).to.equal(initialSupply - burnAmount);
    });

    it("Should fail if trying to burn more than balance", async function () {
      const transferAmount = ethers.parseEther("100");
      const burnAmount = ethers.parseEther("150");

      await baseToken.transfer(addr1.address, transferAmount);

      await expect(
        baseToken.connect(addr1).burn(burnAmount)
      ).to.be.revertedWithCustomError(baseToken, "ERC20InsufficientBalance");
    });
  });

  describe("Allowance", function () {
    it("Should allow owner to approve spending", async function () {
      const approveAmount = ethers.parseEther("1000");
      await baseToken.approve(addr1.address, approveAmount);

      const allowance = await baseToken.allowance(owner.address, addr1.address);
      expect(allowance).to.equal(approveAmount);
    });

    it("Should allow approved spender to transfer tokens", async function () {
      const approveAmount = ethers.parseEther("1000");
      const transferAmount = ethers.parseEther("500");

      await baseToken.approve(addr1.address, approveAmount);
      await baseToken.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount);

      const addr2Balance = await baseToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(transferAmount);

      const remainingAllowance = await baseToken.allowance(owner.address, addr1.address);
      expect(remainingAllowance).to.equal(approveAmount - transferAmount);
    });
  });
});
