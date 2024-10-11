import { AddonLifecycle as ApiAddonLifecycle, InstaltionDetails } from "@charjkl/browser.std/backend";
import { NetRequestBlock as ApiNetRequestBlock } from "@charjkl/browser.std/backend";

// Settings:
const settingsPagePath = browser.runtime.getURL("/html/settings/settings.html");
const blockPagePath = browser.runtime.getURL("/html/blocked/blocked.html");


// Api instances:
const AddonLifecycle = new ApiAddonLifecycle();
const NetRequestBlock = new ApiNetRequestBlock(blockPagePath);


type Res = browser.declarativeNetRequest.ResourceType;


namespace Lifecycle
{
	export async function OnInstalledDebugNotice(details: InstaltionDetails) // TODO delete this, is here only for debug
	{
		try
		{
			console.log("Background.index.ts", details);
			
			browser.tabs.create({ url: settingsPagePath, index: 1, active: true}); // TODO delete this this is for testing purposes only
			console.log("settings page path = ", settingsPagePath);
			
			const list = await NetRequestBlock.getRules();
			console.log("List:", list);
			
			const x = await NetRequestBlock.addRule({regexp: "webwavecms"});
			console.log("New rule:", x);
			
			const request = { url: "htps://webwavecms.com", type: "main_frame" as Res }
			const result = await browser.declarativeNetRequest.testMatchOutcome(request);
			console.log("TestMatchOutcome:", result);
		}
		catch(e)
		{
			console.log("Exception:", e);
		}
	}
	export function OnSuspendingDebugNotice() // TODO delete this, is here only for debug
	{
		console.log("Background.index.tx", "suspending");
	}
}
AddonLifecycle.Installed.add(Lifecycle.OnInstalledDebugNotice); // TODO delete this, is here only for debug
AddonLifecycle.Suspending.add(Lifecycle.OnSuspendingDebugNotice); // TODO delete this, is here only for debug