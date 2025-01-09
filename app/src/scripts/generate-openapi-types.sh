#!/bin/bash

# Define the URL to the openAPI endpoint and output file
URL_TO_OPENAPI_ENDPOINT="http://localhost:8081/openapi"
OUTPUT_FILE="./src/types/api-types.d.ts"

echo "Running openapi-typescript generator..."

deno run --allow-read --allow-env --allow-net --allow-write npm:openapi-typescript ${URL_TO_OPENAPI_ENDPOINT} -o ${OUTPUT_FILE}

echo "Successfully generated types!"