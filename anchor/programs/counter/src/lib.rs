#![allow(clippy::result_large_err)]
pub mod event;

use crate::event::*;

use anchor_lang::prelude::*;
use solana_program::msg;

declare_id!("8QGkPECmVESqtwtGu8bYQUEgZPfNBGdy3GmEn76FF7yG");

#[program]
pub mod counter {
  use super::*;

  pub fn close(ctx: Context<CloseCounter>) -> Result<()> {
    emit!(CounterClosed {
      signer: ctx.accounts.payer.key(),
      counter: ctx.accounts.counter.key(),
      count: ctx.accounts.counter.count,
    });

    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.counter.count = ctx.accounts.counter.count.checked_sub(1).unwrap();
    emit!(CountTriggered {
      signer: ctx.accounts.payer.key(),
      counter: ctx.accounts.counter.key(),
      count: ctx.accounts.counter.count,
      increment: false,
    });

    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.counter.count = ctx.accounts.counter.count.checked_add(1).unwrap();
    emit!(CountTriggered {
      signer: ctx.accounts.payer.key(),
      counter: ctx.accounts.counter.key(),
      count: ctx.accounts.counter.count,
      increment: true,
    });

    Ok(())
  }

  pub fn initialize(ctx: Context<InitializeCounter>) -> Result<()> {
    emit!(CounterCreated {
      signer: ctx.accounts.payer.key(),
      counter: ctx.accounts.counter.key(),
    });

    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.counter.count = value;
    emit!(CounterSet {
      signer: ctx.accounts.payer.key(),
      counter: ctx.accounts.counter.key(),
      count: value,
    });

    Ok(())
  }

  pub fn mint(ctx: Context<Mint>, amount: u64) -> Result<()> {
    // fake mint function for testing
    emit!(UserPositionUpdated {
      signer: ctx.accounts.payer.key(),
      market: ctx.accounts.payer.key(),
      owner: ctx.accounts.payer.key(),
      strategy_group: ctx.accounts.payer.key(),
      user_position: ctx.accounts.payer.key(),
      synthetic_amount: amount,
      is_increase: true,
    });

    Ok(())
  }

  pub fn request_redeem(ctx: Context<RequestRedeem>, amount: u64) -> Result<()> {
    // fake redeem function for testing
    emit!(UserPositionUpdated {
      signer: ctx.accounts.payer.key(),
      market: ctx.accounts.payer.key(),
      owner: ctx.accounts.payer.key(),
      strategy_group: ctx.accounts.payer.key(),
      user_position: ctx.accounts.payer.key(),
      synthetic_amount: amount,
      is_increase: false,
    });

    emit!(RedeemRequested {
      signer: ctx.accounts.payer.key(),
      market: ctx.accounts.payer.key(),
      strategy_group: ctx.accounts.payer.key(),
      redeem_request: ctx.accounts.payer.key(),
      user_position: ctx.accounts.payer.key(),
      underlying_token_mint: ctx.accounts.payer.key(),
      synthetic_mint: ctx.accounts.payer.key(),
      synthetic_amount_burned: amount,
    });
  
    Ok(())
  }

  pub fn cancel_redeem_request(ctx: Context<CancelRedeemRequest>, amount: u64) -> Result<()> {
    // fake cancel redeem function for testing
    emit!(UserPositionUpdated {
      signer: ctx.accounts.payer.key(),
      market: ctx.accounts.payer.key(),
      owner: ctx.accounts.payer.key(),
      strategy_group: ctx.accounts.payer.key(),
      user_position: ctx.accounts.payer.key(),
      synthetic_amount: amount,
      is_increase: false,
    });

    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeCounter<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
    init,
    space = 8 + Counter::INIT_SPACE,
    payer = payer
  )]
  pub counter: Account<'info, Counter>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseCounter<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
    mut,
    close = payer, // close account and return lamports to payer
  )]
  pub counter: Account<'info, Counter>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(mut)]
  pub counter: Account<'info, Counter>,
}

#[derive(Accounts)]
pub struct Mint<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(mut)]
  pub counter: Account<'info, Counter>,
}

#[derive(Accounts)]
pub struct RequestRedeem<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(mut)]
  pub counter: Account<'info, Counter>,
}

#[derive(Accounts)]
pub struct CancelRedeemRequest<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(mut)]
  pub counter: Account<'info, Counter>,
}

#[account]
#[derive(InitSpace)]
pub struct Counter {
  count: u8,
}
