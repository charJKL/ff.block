import type { MessageToBackend, MessageToFrontend } from "@charjkl/browser.std/backend"

export type Rule = { id: number, regexp: string }; // TODO this will come from service
type Rules = Array<Rule>;
type RulesChangedInfo = {};

export type CommProtocol =
{
	"GetRules": MessageToBackend<() => Rules>;
	"AddRule": MessageToBackend<(rule: Rule) => Rule>;
	"ChangeRule": MessageToBackend<(rule: Rule) => Rule>;
	
	"RulesChanged": MessageToFrontend<() => Rules>;
}