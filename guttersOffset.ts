import { MarkdownView, Plugin, WorkspaceLeaf } from 'obsidian';

export default class GuttersOffsetPlugin extends Plugin {
	async onload() {
		app.workspace.onLayoutReady(this.updateAllLeaves.bind(this));
		app.workspace.on("layout-change", this.updateAllLeaves.bind(this));
		app.workspace.on("active-leaf-change", (leaf)=> leaf && this.updateLeafOffset(leaf));
	}

	updateAllLeaves(){
		app.workspace.getLeavesOfType("markdown").forEach((leaf)=> this.updateLeafOffset(leaf));
	}

	updateLeafOffset(leaf: WorkspaceLeaf) {
		const view = leaf.view;
		if(view instanceof MarkdownView){
			const contentEl = view.contentEl;
			const gutters = contentEl.querySelector(".cm-gutters") as HTMLElement;
			contentEl.style.setProperty("--gutters-width", `${gutters.offsetWidth}px`);
		}
	}

	onunload() {

	}
}
