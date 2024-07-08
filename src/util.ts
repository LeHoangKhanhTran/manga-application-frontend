export const splitParagraph = (paragraph: string) => {
    const seperatorRegEx = /\\n\s*/;
    return paragraph.split(seperatorRegEx);
}

export const transformLongText = (text: string, limit: number) => {
    if (text.length > limit) {
        text = text.substring(0, limit).concat('...');
    }
    return text;
}
