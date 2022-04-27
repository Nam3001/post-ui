function handlePagination(currentPage, quantity) {
  let current = currentPage,
      last = quantity,
      delta = 2,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l

    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || i >= left && i < right) {
        range.push(i)
      }
    }

    for (let i of range) {
      if (l) {
          if (i - l !== 1) {
              rangeWithDots.push('...');
          }
      }
      rangeWithDots.push(i);
      l = i;
  }

  console.log(range);
    return rangeWithDots
}

console.log(handlePagination(5, 30));