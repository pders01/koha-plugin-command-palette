export function debounce<F extends (...args: never[]) => void>(
    func: F,
    wait: number,
    immediate: boolean
): (...args: Parameters<F>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
        const later = function (this: unknown) {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };

        const callNow = immediate && !timeout;
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(this, args);
        }
    };
}
