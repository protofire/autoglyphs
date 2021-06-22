import { BigInt } from "@graphprotocol/graph-ts";
import { Block } from "../../../generated/schema";


export namespace blocks {
	export function getOrCreateBlock(
		id: string, timestamp: BigInt, number: BigInt
	): Block {
		let block = Block.load(id)
		if (block == null) {
			block = new Block(id)
			block.timestamp = timestamp
			block.number = number
		}
		return block as Block
	}

}