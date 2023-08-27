export const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach((node) => {
                if (node.querySelector) {
                    const textArea = node.querySelector("textarea[data-cy-post-form-text]");
                    // console.log(textArea);
                    if (textArea) {
                        const buttonWrapper = document.createElement("div");
                        buttonWrapper.className = "button-wrapper";
                        const buttons = [new ModerateWithLlmButton(textArea), new OgyaButton(textArea),];
                        for (const button of buttons) {
                            buttonWrapper.appendChild(button.button);
                        }
                        const form = node.querySelector("footer[class=xkr7J]");
                        // console.log(form);
                        if (form) {
                            form.appendChild(buttonWrapper);
                        }
                    }
                }
            });
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true, characterData: true });
