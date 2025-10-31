# Cirkle Real Estate Tokenization Platform

Cirkle is a decentralized real estate tokenization platform built on the Solana blockchain. It enables users to buy and sell fractional ownership tokens representing real estate markets in different cities worldwide. Each city has its own unique token backed by a circle rate, allowing users to speculate on and invest in global real estate markets from their wallet.

[![Cirkle Demo Video](https://img.youtube.com/vi/vRzlptN9gLo/maxresdefault.jpg)](https://www.youtube.com/watch?v=vRzlptN9gLo)

## Project Overview

Cirkle consists of three main components that work together to create a complete tokenization platform:

1. Frontend Application - Next.js web interface for users to buy and sell city tokens
2. Cirkle Contract - Anchor-based Solana programs that handle tokenization logic
3. Oracle Contract - Provides real time city data and circle rates

### Component Interaction

The frontend application communicates with two smart contracts deployed on Solana:

1. Cirkle Contract handles the core tokenization logic including buying tokens, selling tokens, and managing admin vaults
2. Oracle Contract provides city data including city names, circle rates, countries, and areas

Both contracts operate on Devnet and are accessed through Helius RPC endpoint. External services including Unsplash for images, Pinata for IPFS storage, and Metaplex for token metadata complete the system.

### Data Flow Summary

When a user purchases a city token:

1. User specifies the SOL amount they want to invest
2. Frontend fetches city image from Unsplash
3. Image and metadata are uploaded to Pinata IPFS
4. Transaction is constructed with city name, amount, rates, and metadata URI
5. Wallet signs the transaction
6. Smart contract creates city mint if new, mints tokens to user, and creates Metaplex metadata
7. SOL is transferred to the admin vault
8. Token appears in user's wallet and becomes tradable

## Complete System Interaction Flow

```
                         CIRKLE PLATFORM COMPLETE FLOW

                        ┌─────────────────────────────┐
                        │   USER WITH WALLET          │
                        │ (Phantom/Solflare/Coinbase) │
                        └────────────┬────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    │                │                │
        ┌───────────▼────────┐   ┌──▼──────────┐   ┌─▼───────────────┐
        │ Browse Cities      │   │ Select City │   │ Manage Portfolio│
        │ app/cities/page    │   │ app/city    │   │ View balances   │
        └───────────┬────────┘   └──┬──────────┘   └─┬───────────────┘
                    │                │                │
                    │                │                │
        ┌───────────▼────────────────▼────────────────▼──────────────┐
        │                    FRONTEND LAYER                          │
        │                   (Next.js + React)                        │
        │                                                            │
        │  ┌────────────────────────────────────────────────────┐   │
        │  │ Components & State Management                      │   │
        │  │ • useProgram hook (Cirkle contract)              │   │
        │  │ • useOracleProgram hook (Oracle contract)        │   │
        │  │ • Transaction builders (buy/sell)                │   │
        │  │ • Error handling & notifications                 │   │
        │  └──────────────────────┬─────────────────────────────┘   │
        │                         │                                 │
        │  ┌──────────────────────▼──────────────────────────────┐  │
        │  │ API Routes (Node.js)                               │  │
        │  │ /api/unsplash/image    → Fetch city images       │  │
        │  │ /api/ipfs/upload       → Upload to Pinata        │  │
        │  │ /api/initialize-vault  → Admin operations        │  │
        │  └──────────────────────┬──────────────────────────────┘  │
        │                         │                                 │
        └─────────────────────────┼─────────────────────────────────┘
                                  │
                ┌─────────────────┼─────────────────┐
                │                 │                 │
                │                 │                 │
     ┌──────────▼───────┐  ┌──────▼────────┐  ┌────▼──────────────┐
     │ EXTERNAL SERVICES│  │ RPC ENDPOINT  │  │ WALLET SIGNATURE  │
     │                  │  │               │  │                   │
     │ Unsplash API     │  │ Helius RPC    │  │ User signs in     │
     │ • Fetch images   │  │ (Devnet)      │  │ wallet extension  │
     │ • City photos    │  │               │  │                   │
     │                  │  │ Connects to   │  │ Provides:         │
     │ Pinata IPFS      │  │ Solana        │  │ • Signature       │
     │ • Upload image   │  │ Blockchain    │  │ • Authorization   │
     │ • Store metadata │  │               │  │                   │
     │ • Get gateways   │  │ Handles:      │  │ Sends to wallet   │
     │                  │  │ • Account     │  │ extension for     │
     │ Metaplex         │  │   fetches     │  │ approval          │
     │ • Token metadata │  │ • Transaction │  │                   │
     │ • NFT standards  │  │   simulation  │  │                   │
     │                  │  │ • Broadcasting│  │                   │
     │                  │  │ • Confirmation│  │                   │
     └──────────┬───────┘  └──────┬────────┘  └────┬──────────────┘
                │                 │                │
                │                 │                │
                │    ┌────────────▼────────────┐  │
                │    │                         │  │
                │    ▼                         │  │
                │  SIGNED TRANSACTION          │  │
                │  FROM WALLET                 │  │
                │                              │  │
                └──────────────┬────────────────┘
                               │
                               │ Broadcast to
                               │ Solana network
                               │
                               ▼
        ┌──────────────────────────────────────────────────┐
        │          SOLANA BLOCKCHAIN (DEVNET)              │
        │                                                  │
        │  ┌──────────────────────────────────────────┐   │
        │  │ CIRKLE CONTRACT                          │   │
        │  │ Es7CnmurWMiDfEUCrFVBpHvWy7jqdVHf8a7mt... │   │
        │  │                                          │   │
        │  │ BUY FLOW:                               │   │
        │  │ 1. Validate inputs & rates             │   │
        │  │ 2. Create city mint (if new)           │   │
        │  │ 3. Create city config (if new)         │   │
        │  │ 4. Calculate token amount              │   │
        │  │ 5. Mint tokens to user ATA             │   │
        │  │ 6. Create Metaplex metadata            │   │
        │  │ 7. Transfer SOL to vault               │   │
        │  │                                          │   │
        │  │ SELL FLOW:                              │   │
        │  │ 1. Validate city config & mint         │   │
        │  │ 2. Calculate SOL to return             │   │
        │  │ 3. Burn tokens from user ATA           │   │
        │  │ 4. Transfer SOL from vault to user     │   │
        │  │ 5. Update vault balance                │   │
        │  │                                          │   │
        │  │ STATE ACCOUNTS:                         │   │
        │  │ • Vault (admin controlled)             │   │
        │  │ • CityConfig (per city)                │   │
        │  │ • City Mints (per city)                │   │
        │  └──────────────────────────────────────────┘   │
        │                                                  │
        │  ┌──────────────────────────────────────────┐   │
        │  │ ORACLE CONTRACT                          │   │
        │  │ 8Kns8bTCHGWYh2MUcYb4p7tK6subWE9jkyZ...  │   │
        │  │                                          │   │
        │  │ MAINTAINS:                               │   │
        │  │ • Cities array                          │   │
        │  │ • Circle rates per city                 │   │
        │  │ • Country information                   │   │
        │  │ • Area measurements                     │   │
        │  │ • Last update timestamps                │   │
        │  │                                          │   │
        │  │ ALLOWS ADMIN TO:                        │   │
        │  │ • Add new cities                        │   │
        │  │ • Update circle rates                   │   │
        │  │ • Change city properties                │   │
        │  └──────────────────────────────────────────┘   │
        │                                                  │
        │  ┌──────────────────────────────────────────┐   │
        │  │ SPL TOKEN PROGRAM                        │   │
        │  │ (Used for minting & burning)             │   │
        │  │                                          │   │
        │  │ • Mint tokens                           │   │
        │  │ • Burn tokens                           │   │
        │  │ • Manage token accounts                 │   │
        │  └──────────────────────────────────────────┘   │
        │                                                  │
        │  ┌──────────────────────────────────────────┐   │
        │  │ METAPLEX TOKEN METADATA                  │   │
        │  │ (Used for NFT standard)                  │   │
        │  │                                          │   │
        │  │ • Create metadata accounts              │   │
        │  │ • Store token name/symbol/URI           │   │
        │  │ • Enable Solana Explorer visibility     │   │
        │  └──────────────────────────────────────────┘   │
        │                                                  │
        └──────────────────────┬───────────────────────────┘
                               │
                   ┌───────────▼───────────┐
                   │                       │
                   │ BLOCKCHAIN CONSENSUS  │
                   │ Transaction included  │
                   │ in block             │
                   │ Block committed      │
                   │                       │
                   └───────────┬───────────┘
                               │
                               ▼
        ┌──────────────────────────────────────────────────┐
        │           RESULTS CONFIRMED ON CHAIN             │
        │                                                  │
        │ BUY TRANSACTION:                                │
        │ • City token created (if new city)             │
        │ • New tokens minted to user ATA               │
        │ • Metaplex metadata created (if new)          │
        │ • SOL transferred to admin vault              │
        │ • User token balance increased                │
        │                                                  │
        │ SELL TRANSACTION:                               │
        │ • User tokens burned                           │
        │ • SOL transferred to user wallet              │
        │ • Vault balance decreased                      │
        │ • User balance updated                         │
        └──────────────────────┬───────────────────────────┘
                               │
                               ▼
        ┌──────────────────────────────────────────────────┐
        │        FRONTEND RECEIVES CONFIRMATION            │
        │                                                  │
        │ • Poll Helius for transaction confirmation     │
        │ • Fetch updated account balances              │
        │ • Refresh token balances from SPL program    │
        │ • Update UI with new state                     │
        │ • Display success message                      │
        │ • Update portfolio/trading history             │
        └──────────────────────┬───────────────────────────┘
                               │
                               ▼
                   ┌───────────────────────┐
                   │   USER SEES RESULTS   │
                   │                       │
                   │ BUY:                 │
                   │ • Tokens in wallet   │
                   │ • SOL deducted       │
                   │                       │
                   │ SELL:                │
                   │ • Tokens removed     │
                   │ • SOL credited       │
                   │ • Portfolio updated  │
                   │                       │
                   └───────────────────────┘
```

## Directory Structure

### Frontend Repository Structure

```
cirkle/
  app/
    layout.tsx                    Root layout with providers
    page.tsx                      Landing page
    cities/
      page.tsx                    Cities list browser
    city/
      [name]/
        page.tsx                  Individual city trading interface
    api/
      unsplash/
        image/
          route.ts                Unsplash image fetching endpoint
      ipfs/
        upload/
          route.ts                IPFS metadata upload endpoint
      initialize-vault/
        route.ts                  Admin vault initialization
    admin/                        Admin panel directory
  lib/
    solana/
      oracle/
        oracle.ts                 useOracleProgram hook for oracle contract interaction
        getCity.ts                Fetch single city data from oracle
        getCityList.ts            Fetch all available cities
      cerkle/
        cerkle.ts                 useProgram hook for main contract
        buy.ts                    Buy token transaction builder
        sell.ts                   Sell token transaction builder
      admin/                      Admin-specific operations
    SolanaProvider.tsx            Wallet and connection setup component
    ipfs.ts                       IPFS upload wrapper functions
    unsplash.ts                   Unsplash API client functions
    auth.ts                       Authentication utilities
  idl/
    cirkle_contract.json          Contract IDL definition
    cirkle_contract.ts            Generated TypeScript types from IDL
    oracle.json                   Oracle program IDL
    oracle.ts                     Generated TypeScript types from oracle IDL
  public/                         Static assets
  styles/                         Global styles and Tailwind configuration
```

### Smart Contract Repository Structure

```
cirkle-contract/
  programs/
    cirkle-contract/
      src/
        lib.rs                    Main program entry point and instruction routing
        error.rs                  Custom error types and error handling
        instructions/
          mod.rs                  Instruction module exports
          initialize.rs           Vault initialization instruction for admin
          buy.rs                  Buy city tokens instruction
          sell.rs                 Sell city tokens instruction
          withdraw.rs             Admin withdrawal instruction
        state/
          mod.rs                  State module exports
          vault.rs                Vault account structure definition
          city_config.rs          City configuration account structure
        lib.rs                    Library exports
      Cargo.toml                  Rust dependencies
  tests/                          Integration tests
  migrations/                     Anchor migrations
  Anchor.toml                     Anchor configuration
```

## Smart Contracts

### Cirkle Contract

Program ID: Es7CnmurWMiDfEUCrFVBpHvWy7jqdVHf8a7mtMnN7bmg

#### State Accounts

Vault Account:
Stores admin public key, total SOL balance, and PDA bump seed. Secured by PDA seeding with admin key ensuring only one vault per admin.

CityConfig Account:
Stores city name (max 32 characters), token mint address, total token supply, metadata URI (max 256 characters), and PDA bump seed. Created once per city during first purchase.

#### Instructions

Buy Instruction:
Accepts city name, SOL amount in lamports, circle rate, SOL price in USD, and metadata URI. Creates or initializes city mint and configuration on first purchase. Mints tokens to user's associated token account using formula: tokens = (USD value * 1,000,000) / circle_rate. Creates Metaplex metadata for NFT-like token representation. Transfers SOL to vault and updates balances.

Sell Instruction:
Accepts city name, token amount, circle rate, and SOL price in USD. Validates city configuration matches mint address. Burns tokens from user's account using reverse calculation: SOL = (tokens * rate / 1,000,000) / SOL price. Transfers SOL from vault to user.

Vault Initialize Instruction:
Admin only instruction that creates the protocol vault PDA. Seeds vault with admin public key to ensure exclusive control.

Withdraw Instruction:
Admin only instruction for withdrawing SOL from vault. Validates admin signature and sufficient balance.

### Oracle Contract

Program ID: 8Kns8bTCHGWYh2MUcYb4p7tK6subWE9jkyZiWq2T5Tn7

Provides city data including city names, circle rates, countries, areas, and timestamps. Frontend queries this contract to populate available cities and real time pricing.

## Deployment Information

### Network

All contracts and frontend deployed on Solana Devnet for testing and development.

### Contract Addresses

Cirkle Contract: Es7CnmurWMiDfEUCrFVBpHvWy7jqdVHf8a7mtMnN7bmg
Oracle Contract: 8Kns8bTCHGWYh2MUcYb4p7tK6subWE9jkyZiWq2T5Tn7

### Admin Configuration

Admin Public Key: 58T8QQkwaucFPeX916gzaEnV6EZmwBpKvRPR9Zxhu71p

## License

Cirkle is open source software. Check LICENSE file for details.

## Support

For issues or questions, please open an issue on GitHub or contact the development team through project channels.