export const getPaginationRange = (currentPage:number, totalPages:number) => {
    if (totalPages === 0) return [];

    const range:number[] = [];
    const rangesWithDots = []

    range.push(0);

    for(let i:number = currentPage - 2; i <= currentPage + 2; i++) {
        if(i > 0 && i < totalPages - 1) range.push(i);
    }

    if(totalPages > 1) range.push(totalPages-1);

    let lastValue:number | undefined = undefined;
    for(const page of range) {
        if(lastValue !== undefined) {
            if(page - lastValue > 1) rangesWithDots.push("...");
        }
        rangesWithDots.push(page);
        lastValue = page;
    }

    return rangesWithDots;
}