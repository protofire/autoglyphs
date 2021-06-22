import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import {
	Approval,
	ApprovalForAll,
	Generated,
	Transfer
} from "../../generated/autoglyphs/autoglyphs";

import { transfer } from "./transfer"

import {
	tokens,
	accounts,
	blocks
} from "../modules";



export function handleTransfer(event: Transfer): void {

	let from = event.params._from.toHex()
	let to = event.params._to.toHex()
	let tokenId = event.params._tokenId.toHex()
	let blockNumber = event.block.number
	let blockId = blockNumber.toString()
	let timestamp = event.block.timestamp

	let block = blocks.getOrCreateBlock(blockId, timestamp, blockNumber)
	block.save()

	if (from == ADDRESS_ZERO) {
		transfer.handleMint(event.params._to, tokenId, timestamp, blockId)
	} else if (to == ADDRESS_ZERO) {
		transfer.handleBurn(event.params._from, tokenId, timestamp, blockId)
	} else {
		transfer.handleRegularTransfer(event.params._from, event.params._to, tokenId, timestamp, blockId)
	}

}

export function handleApproval(event: Approval): void {
	let tokenId = event.params._tokenId.toHex()
	let ownerAddress = event.params._owner
	let approvedAddress = event.params._approved

	let approved = accounts.getOrCreateAccount(approvedAddress)
	approved.save()

	let owner = accounts.getOrCreateAccount(ownerAddress)
	owner.save()

	let token = tokens.addApproval(tokenId, approvedAddress.toHex())
	token.save()
}

export function handleApprovalForAll(event: ApprovalForAll): void {
	let ownerAddress = event.params._owner
	let operatorAddress = event.params._operator

	let owner = accounts.getOrCreateAccount(ownerAddress)
	owner.save()

	let operator = accounts.getOrCreateAccount(operatorAddress)
	operator.save()

	let operatorOwner = accounts.getOrCreateOperatorOwner(owner.id, operator.id, event.params._approved)
	operatorOwner.save()

}


export function handleGenerated(event: Generated): void {
	let uri = event.params.value.toString()
	let owner = event.params.a.toHex()
	let tokenId = event.params.index.toHex()

	let token = tokens.addUri(
		tokenId,
		owner,
		uri
	)
	token.save()
}

