import { MarkedOptions, MarkedRenderer } from "ngx-markdown";

export function markedOptionsFactory(): MarkedOptions {
    const renderer = new MarkedRenderer();

    renderer.blockquote = (text: string) => {
        text = text.slice(3, text.lastIndexOf('</p>'));
        return '<blockquote>' + (text?.replace(/\n/g, '<br />') || '') + '</blockquote>';
    };

    renderer.checkbox = (checked: boolean) => {
        return checked ? '<span class="edh-markdown-checked">☑&nbsp;</span>' : '<span class="edh-markdown-unchecked">☐&nbsp;</span>';
    }

    return {
        renderer: renderer
    };
}