// Sieve of Eratosthenes
// Adaptation of python code by David Eppstein, UC Irvine, 28 Feb 2002
// http://code.activestate.com/recipes/117119/

function eratosthenes(n) {
  // Return the sequence of prime numbers via the Sieve of Eratosthenes.
  let D = {}; // map composite integers to primes witnessing their compositeness
  let q = 2; // first integer to test for primality
  let primes = [];

  do {
    if (!(q in D)) {
      primes.push(q); // not marked composite
      D[q * q] = [q]; // first multiple of q not already marked
    } else {
      for (let p of D[q]) {
        // move each witness to its next multiple
        let next_composite = p + q;
        if (next_composite in D) {
          D[next_composite].push(p);
        } else {
          D[next_composite] = [p];
        }
        delete D[q]; // no longer need D[q], free memory
      }
    }
    q++;
  } while (primes.length < n);

  return primes;
}

console.time();
primes = eratosthenes(process.argv[2]);
console.log(primes.toString());
console.timeEnd(); // Time for 1 million first primes: 0m14.210s
