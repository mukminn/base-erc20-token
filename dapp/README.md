# BaseToken dApp

Mini dApp untuk berinteraksi dengan BaseToken ERC20 di Base blockchain.

## ✨ Features

- 🔌 **Connect Wallet** - Connect dengan MetaMask
- 📖 **Read Contract** - Lihat token info, balance, total supply
- ✍️ **Write Transactions** - Transfer, Mint, Burn tokens
- 🎨 **Simple UI** - Clean dan modern interface
- 🚀 **Deploy Ready** - Siap deploy ke Vercel

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd dapp
npm install
```

### 2. Setup Environment

Copy `.env.example` ke `.env`:

```bash
cp .env.example .env
```

Edit `.env` dan tambahkan contract address setelah deploy:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddressHere
```

### 3. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deploy

### Build untuk Production

```bash
npm run build
npm start
```

### Deploy ke Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Atau push ke GitHub dan import ke Vercel melalui web interface.

### Environment Variables di Vercel

Tambahkan environment variable:
- `NEXT_PUBLIC_CONTRACT_ADDRESS` - Address contract BaseToken yang sudah di-deploy

## 🎯 Usage

1. **Connect Wallet**
   - Klik "Connect Wallet"
   - Approve di MetaMask
   - Pastikan network sudah Base atau Base Sepolia

2. **Read Contract**
   - Masukkan contract address
   - Klik "Load Info"
   - Lihat token name, symbol, total supply, dan balance Anda

3. **Transfer Tokens**
   - Pilih tab "Transfer"
   - Masukkan address tujuan
   - Masukkan amount
   - Klik "Transfer"
   - Approve transaction di MetaMask

4. **Mint Tokens** (Owner only)
   - Pilih tab "Mint"
   - Masukkan address tujuan
   - Masukkan amount
   - Klik "Mint"

5. **Burn Tokens**
   - Pilih tab "Burn"
   - Masukkan amount
   - Klik "Burn"

## 🔧 Configuration

### Network Configuration

Edit `lib/contract.ts` untuk mengubah network configuration jika perlu.

### Contract ABI

ABI sudah disederhanakan untuk fungsi-fungsi yang diperlukan. Untuk menambah fungsi, edit `lib/contract.ts`.

## 📝 Notes

- Pastikan MetaMask sudah terinstall
- Pastikan network sudah Base atau Base Sepolia
- Contract address harus diisi setelah deploy smart contract
- Mint hanya bisa dilakukan oleh contract owner

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **ethers.js v6** - Ethereum library
- **Tailwind CSS** - Styling
- **Base Blockchain** - L2 network

## 📄 License

MIT
