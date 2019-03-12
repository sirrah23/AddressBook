#!/bin/bash

PYTHONPATH=$(dirname $PWD)

pipenv run nosetests test/
