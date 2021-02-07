/**
 * Challenge 1
 *
 * Find the closest number to num from the listOfNumbers. 
 * Assume the input array only contains unique values.
 * 
 */
export const getClosestValue = (num: number, listOfNumbers: number[]): number => {

    /**
     * 
     * Returns the first closest number; null when there are no values.
     *  
     * */

    if (listOfNumbers.length > 0) {

        return listOfNumbers.reduce(
            (prev, current) => prev === null ? current : // straight to current 1st time
                Math.abs(num - prev) <= Math.abs(num - current) ? prev : current, // 1st closest hence "<="
            null); // init with null

    } else {

        // no values
        return null;

    }


};
