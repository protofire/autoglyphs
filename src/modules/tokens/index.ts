import { BigInt, log } from '@graphprotocol/graph-ts'
import { Token } from "../../../generated/schema";


export namespace tokens {
	export function getNewToken(tokenId: string, accountId: string): Token {
		let token = Token.load(tokenId)
		if (token == null) {
			token = new Token(tokenId)
			token.owner = accountId
		}
		return token as Token
	}

	export function loadToken(tokenId: string): Token {
		let token = Token.load(tokenId)
		if (token == null) {
			// maybe it should be created or loaded
			log.info(
				"@@@@@ at func: {} msg: {}",
				["loadToken",
					"Couldn't find token w/ id: " + tokenId]
			)
			log.critical("", [""])
		}
		return token as Token
	}

	export function mintToken(
		tokenId: string
	): Token {
		let token = loadToken(tokenId)
		token.burned = false
		return token as Token
	}

	export function burnToken(
		tokenId: string
	): Token {
		let token = loadToken(tokenId)
		token.burned = true
		return token as Token
	}


	export function changeOwner(tokenId: string, owner: string): Token {
		let token = loadToken(tokenId)
		token.owner = owner
		return token as Token
	}

	export function addApproval(tokenId: string, approval: string): Token {
		let token = loadToken(tokenId)
		token.approval = approval
		return token as Token
	}
}
