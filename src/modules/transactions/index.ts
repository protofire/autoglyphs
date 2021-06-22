import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { BigInt } from "@graphprotocol/graph-ts";
import {
	Mint,
	Burn,
	Transfer,
} from "../../../generated/schema";

export namespace transactions {

	export namespace constants {
		export let TRANSACTION_MINT = "MINT"
		export let TRANSACTION_BURN = "BURN"
		export let TRANSACTION_TRANSFER = "TRANSFER"
	}

	export namespace helpers {
		export function getNewTransactionId(
			from: string, to: string, timestamp: BigInt
		): string {
			return from + "-" + to + "-" + timestamp.toString()
		}
	}

	export function getNewMint(
		to: string, token: string, timestamp: BigInt, blockId: string
	): Mint {
		let transaction = new Mint(helpers.getNewTransactionId(ADDRESS_ZERO, to, timestamp))
		transaction.from = ADDRESS_ZERO
		transaction.to = to
		transaction.token = token
		transaction.block = blockId
		transaction.type = constants.TRANSACTION_MINT
		return transaction as Mint
	}

	export function getNewBurn(from: string, token: string, timestamp: BigInt, blockId: string): Burn {
		let transaction = new Burn(helpers.getNewTransactionId(from, ADDRESS_ZERO, timestamp))
		transaction.from = from
		transaction.to = ADDRESS_ZERO
		transaction.token = token
		transaction.block = blockId
		transaction.type = constants.TRANSACTION_BURN
		return transaction as Burn
	}

	export function getNewTransfer(
		from: string, to: string,
		token: string, timestamp: BigInt, blockId: string
	): Transfer {
		let transaction = new Transfer(helpers.getNewTransactionId(from, to, timestamp))
		transaction.from = from
		transaction.to = to
		transaction.token = token
		transaction.block = blockId
		transaction.type = constants.TRANSACTION_TRANSFER
		return transaction as Transfer
	}

}