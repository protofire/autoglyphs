import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import {
	Approval,
	ApprovalForAll,
	Generated,
	Transfer
} from "../../generated/autoglyphs/autoglyphs";

import { transfer } from "./transfer"

import { tokens } from "../modules/tokens";



export function handleTransfer(event: Transfer): void {

	let from = event.params._from.toHex()
	let to = event.params._to.toHex()
	let tokenId = event.params._tokenId.toHex()
	let timestamp = event.block.timestamp

	if (from == ADDRESS_ZERO) {
		transfer.handleMint(event.params._to, tokenId, timestamp)
	} else if (to == ADDRESS_ZERO) {
		transfer.handleBurn(event.params._from, tokenId, timestamp)
	} else {
		transfer.handleRegularTransfer(event.params._from, event.params._to, tokenId, timestamp)
	}

}

export function handleApproval(event: Approval): void {

}

export function handleApprovalForAll(event: ApprovalForAll): void {

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

