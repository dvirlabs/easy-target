import random

def generate_random_ip():
    return '.'.join(str(random.randint(0, 255)) for _ in range(4))

def generate_random_port():
    return random.randint(1, 65535)

def generate_random_ip_port():
    ip = generate_random_ip()
    port = generate_random_port()
    return f"{ip}:{port}"

def write_to_file(filename, num_combinations):
    with open(filename, 'w') as file:
        for _ in range(num_combinations):
            file.write(generate_random_ip_port() + '\n')

if __name__ == "__main__":
    num_combinations = 1000  # Adjust the number of combinations as needed
    write_to_file('example_targets.txt', num_combinations)
