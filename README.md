# TWAISWCF

[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://okatsn.github.io/TWAISWCF/stable/)
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://okatsn.github.io/TWAISWCF/dev/)
[![Build Status](https://github.com/okatsn/TWAISWCF/actions/workflows/CI.yml/badge.svg?branch=main)](https://github.com/okatsn/TWAISWCF/actions/workflows/CI.yml?query=branch%3Amain)
[![Coverage](https://codecov.io/gh/okatsn/TWAISWCF/branch/main/graph/badge.svg)](https://codecov.io/gh/okatsn/TWAISWCF)

<!-- Don't have any of your custom contents above; they won't occur if there is no citation. -->

## Workflows
TODOs:

(`df0`)

Pre-process
- (`df1`) Calculate derived variables (accumulative precipitation)
- (`df2`) series2supervised (time shift)
- In TWAISWCF

Feature selection
- specific tpasts and name
- in SWCForecastBase

Models (input table: `df2`-like)
- fundamental models
- use mutable struct?
- in SWCForecastBase

Training
- train model
- update model
- In TWAISWCF

Predicting
- Use trained model to predict

Wrapping function
- given a `df0`, current time `t0::DateTime`, train the model and outputs `df2_train` and `df2_test` (if available). % todo: remember to test the case where `df2_test` is `nothing`.

## References



This package is create on 2023-02-22.
