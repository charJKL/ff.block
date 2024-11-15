import { RulesList } from "./main/RulesList";
import css from "./Main.module.scss";

export function Main()
{
	return (
		<main className={css.main}>
			To jest main
			<RulesList />
		</main>
	);
}