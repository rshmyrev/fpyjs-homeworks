import sys
from array import array
from time import time

from eratosthenes import eratosthenes


def main(n):
    primes = array('I')
    prime_generator = eratosthenes()
    for _ in range(n):
        primes.append(next(prime_generator))

    return primes


if __name__ == '__main__':
    start_time = time()
    primes = main(int(sys.argv[1]))
    print(','.join([str(x) for x in primes]))
    print(f'Time: {round(time() - start_time, 3)}s')
    # Time for 1 million first primes: 0m15.023s
