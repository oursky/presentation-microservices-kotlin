#!/bin/bash -e

NAMESPACE=presentation

function main {
    if ! kubectl get namespace ${NAMESPACE} > /dev/null; then
        kubectl create namespace ${NAMESPACE}
    fi

    if kubectl -n ${NAMESPACE} get configmap postgres-init > /dev/null; then
        kubectl -n ${NAMESPACE} delete configmap postgres-init
    fi
    kubectl -n ${NAMESPACE} create configmap postgres-init --from-file=../../backend/initdb.d/initdb.sh

    if kubectl -n ${NAMESPACE} get secret api-server > /dev/null; then
        kubectl -n ${NAMESPACE} delete secret api-server
    fi
    kubectl -n ${NAMESPACE} create secret generic api-server --from-env-file=.env
    kubectl -n ${NAMESPACE} apply -f api-server.yml
}

BASEDIR=$(cd $(dirname "$0") && pwd)
(
    cd "${BASEDIR}"
    main $@
)