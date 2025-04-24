# Solana & Anchor Setup and Deployment Guide

## 1. Prerequisites

### Solana Installation
- **Minimum Version:** 2.1.20+
- **Installation Command:**
    ```bash
    agave-install init 2.1.21
    ```
- **Verify Version:**
    ```bash
    solana --version
    ```

### Anchor Installation
- **Minimum Version:** 0.31.0+
- **Installation Command:**
    ```bash
    avm install 0.31.1
    ```
- **Verify Version:**
    ```bash
    anchor version
    ```

## 2. Version Consistency Check

Ensure that the versions in your configuration files are aligned.

### In the Anchor Folder
- **File:** [Anchor.toml (line 2)](./anchor/Anchor.toml#L2)
    ```toml
    anchor_version = "0.31.1"
    ```

### In the Counter Program Folder
- **File:** [Cargo.toml (line 20)](./anchor/programs/counter/Cargo.toml#L20)
    ```toml
    ...
    [dependencies]
    anchor-lang = "0.31.1"
    solana-program = "~2.1"
    ```

## 3. Build and Deploy Programs

### Update Program Identifier
- **File:** [lib.rs (line 5)](./anchor/programs/counter/src/lib.rs#L5)
    ```rust
    declare_id!("<YOUR_PROGRAM_ID>");
    ```

### Build the Program
- **Command:**
    ```bash
    cd anchor && anchor build
    ```

### Deploy the Program
- **Option 1: Using Anchor**
    ```bash
    cd anchor && anchor deploy
    ```
- **Option 2: Using Solana CLI**
    - **Locate the Built File:** `target/deploy/counter.so`
    - **Deploy Command:**
        ```bash
        solana program deploy target/deploy/counter.so
        ```

### Inspect the Deployed Program
- **Command:**
    ```bash
    solana program show <YOUR_PROGRAM_ID>
    ```

## 4. Local Validator

### Start Local Validator
- **Command:**
    ```bash
    solana-test-validator
    ```
> This command starts a local validator with the ledger temporarily stored in the `~/project_root/test-ledger` folder.

### Restart Local Validator
- **Commands:**
    ```bash
    solana-test-validator --reset
    ```
    or
    ```bash
    solana-test-validator -r
    ```

## 5. Manage Test SOL

While the local validator is running, the default signer is the first keypair in the `~/.config/solana/id.json` file.

- **Check Your Address:**  
    Outputs the address of the first keypair.
    ```bash
    solana address
    ```
- **Check Balance:**  
    Outputs the balance of the first keypair.
    ```bash
    solana balance
    ```
- **Check Balance for a Specific Address:**
    ```bash
    solana balance <address>
    ```
- **Transfer Test SOL:**  
    If transferring to an address (often a web extension wallet) that isn't initialized, use the `--allow-unfunded-recipient` flag.
    ```bash
    solana transfer <address> 10 --url localhost --allow-unfunded-recipient
    ```
    
    *Note: make sure your web extension wallet have switch to localhost network*
