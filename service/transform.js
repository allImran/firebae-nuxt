export function diffBetweenDate(start, end){
    const date1 = new Date(start);
    const date2 = new Date(end);
    const diffTime = Math.abs(date2 - date1);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - parseInt(1);
    // if(diffDays == 0){
    //     diffDays = 1;
    // }
    return diffDays;
}