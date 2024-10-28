import type { AddonScriptApiMethod, AddonScriptApiNotification } from "@charjkl/browser.std/backend"

export type Rule = { id: number, regexp: string }; // TODO this will come from service
type Rules = Array<Rule>;
type RulesChangedInfo = {};

export type SupportedMessages = 
{
	"GetRules": AddonScriptApiMethod<[], Rules>;
	"AddRule": AddonScriptApiMethod<[Rule], Rule>;
	"ChangeRule": AddonScriptApiMethod<[Rule], Rule>;
}

export type SupportedNotifications =
{
	"RulesChanged": AddonScriptApiNotification<[]>;
}