import type { Receipt } from './verify'

/**
 * A real Tollgate receipt, verbatim from the engine's own output at
 * ~/ventures/tollgate/demo_receipts.json (record `rcpt:p2`, seq 1).
 *
 * Nothing here is invented. The hashes chain: `prev_hash` is the `this_hash`
 * of rcpt:p1, and rcpt:p3 carries this record's `this_hash` as its own
 * `prev_hash`. The signature is the Ed25519 signature the engine emitted over
 * the canonical verdict bytes, and the browser re-checks both live.
 *
 * HONESTY NOTE, stated on the panel itself and not only here: the list
 * snapshot is DEMO-2026-06, a demonstration sanctions list, not a live OFAC
 * SDN pull. Do not swap these values for more impressive-looking ones.
 */
export const receipt: Receipt = {
    "receipt_id": "rcpt:p2",
    "seq": 1,
    "prev_hash": "2dc8c35e9c31579dadda370aed4b4c959c1a874c071ab5a302266d05680495be",
    "action": {
      "action_id": "act:p2",
      "agent_id": "tollgate.shadow",
      "mandate_id": "rulebook:DEMO-2026-06",
      "type": "stablecoin_payment_screen",
      "params": {
        "payment_id": "p2",
        "outcome": "BLOCK",
        "beneficiary_name": "Blocked Person Alpha",
        "amount_usd": 200,
        "originator_info_present": true
      },
      "requested_at": "2026-07-28T18:45:01.361086Z"
    },
    "verdict": {
      "verdict_id": "vd:p2",
      "action_id": "act:p2",
      "authorizer_id": "6af860e4e96f777ac0b6ee3859f23f9d6d131f0c07badfd85fd16b2982632627",
      "decision": "DENY",
      "reasons": [
        "outcome=BLOCK",
        "rulebook_version=DEMO-2026-06",
        "list_snapshot=9ff2a26d9c96f2c16467947a57cc8a8720eb1ba4cf31958262046f243dd626dd",
        "sanctions_hit=SDN-0001"
      ],
      "decided_at": "2026-07-28T18:45:01.361089Z",
      "signature": "86b547591525850585fcea76f754556bfa7efb4673a019480e2c4f1a93e88e71326769e2e4f49c880c2207a854de25077a8808ce9c25165363a5eeb38a8a490f"
    },
    "this_hash": "bf59202537d847494475edbb42856496ae6dcd4f4b31c97fff506e7be1e0b9c9"
  } as Receipt
