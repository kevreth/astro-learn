# myenvlib/env_loader.py
import os
from envparse import env
import argparse

def load_env():
    """
    Parse command-line arguments to load environment variables from the specified .env file.

    :return: A dictionary of the loaded environment variables.
    :raises FileNotFoundError: If the .env file does not exist.
    """
    parser = argparse.ArgumentParser(description="Load environment variables from a specified .env file.")
    parser.add_argument('--env-file', type=str, required=True, help="The .env file to load")

    args = parser.parse_known_args()

    env_file = args[0].env_file

    if not os.path.exists(env_file):
        raise FileNotFoundError(f"{env_file} does not exist")

    env.read_envfile(env_file)

    # Convert the loaded environment variables to a dictionary
    env_vars = {key: env.str(key) for key in os.environ}

    return env_vars 
