#!/bin/bash -e

NAMESPACE=presentation
GITREMOTE=oursky
GITBRANCH=staging

function main {
    local IMAGEID=$1

    if [ -z ${IMAGEID} ]; then
        git fetch ${GITREMOTE}
        IMAGEID=$(git rev-parse --short ${GITREMOTE}/${GITBRANCH})
    fi

    echo "Update deployment to ${IMAGEID}..."
    kubectl -n ${NAMESPACE} set image deployment/api-server \
      auth=gcr.io/oursky-kube/presentation-microservices-kotlin-auth:${IMAGEID}
    kubectl -n ${NAMESPACE} set image deployment/api-server \
      app=gcr.io/oursky-kube/presentation-microservices-kotlin-app:${IMAGEID}
}

BASEDIR=$(cd $(dirname "$0") && pwd)
(
    cd "${BASEDIR}"
    main $@
)
