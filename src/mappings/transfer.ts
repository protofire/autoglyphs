import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import { Transfer } from "../../generated/autoglyphs/autoglyphs";
import {
	accounts,
	transactions
} from "../modules";


function handleMint(to: Bytes, tokenId: string, timestamp: BigInt): void {
	let account = accounts.getOrCreateAccount(to)
	account.save()

	// let avastar = tokens.getNewAvastar(tokenId, account.id)
	// avastar.save()

	let transaction = transactions.getNewMint(account.id, tokenId, timestamp)
	transaction.save()
}


function handleBurn(from: Bytes, tokenId: string, timestamp: BigInt): void {

	let account = accounts.getOrCreateAccount(from)
	account.save()

	// let avastar = tokens.changeOwner(tokenId, ADDRESS_ZERO)
	// avastar.save()

	let transaction = transactions.getNewBurn(account.id, tokenId, timestamp)
	transaction.save()
}

function handleRegularTransfer(from: Bytes, to: Bytes, tokenId: string, timestamp: BigInt): void {

	let seller = accounts.getOrCreateAccount(from)
	seller.save()

	let buyer = accounts.getOrCreateAccount(to)
	buyer.save()

	// let avastar = tokens.changeOwner(tokenId, buyer.id)
	// avastar.save()

	let transaction = transactions.getNewTransfer(seller.id, buyer.id, tokenId, timestamp)
	transaction.save()
}


export function handleTransfer(event: Transfer): void {

	let from = event.params._from.toHex()
	let to = event.params._from.toHex()
	let tokenId = event.params._tokenId.toHex()
	let timestamp = event.block.timestamp

	if (from == ADDRESS_ZERO) {
		handleMint(event.params._to, tokenId, timestamp)
	} else if (to == ADDRESS_ZERO) {
		handleBurn(event.params._from, tokenId, timestamp)
	} else {
		handleRegularTransfer(event.params._from, event.params._to, tokenId, timestamp)
	}

}