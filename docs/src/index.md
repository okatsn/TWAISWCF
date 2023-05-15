

```@meta
CurrentModule = TWAISWCF
```

# A TWAI subproject for SWC estimation

Documentation for [TWAISWCF](https://github.com/okatsn/TWAISWCF).

In this project, we investigate the feasibility of using the Classification and Regression Tree (CART) algorithm for estimating soil water content (SWC) using commonly available meteorological parameters. 
We trained and validated CART models using data collected in a grassland terrain in northern Taiwan throughout 2018, with the goal of providing precise information for agricultural irrigation and flood risk assessment.

This project is funded by the National Science and Technology Council (R.O.C) through grant number MOST 110-2634-F-008-008.

!!! warning "Disclaimer"
    The TWAISWCF package is an experimental algorithm designed for soil-water content estimation in agricultural applications. It has been made freely available to the public for exploration and experimentation purposes. However, it is important to understand and acknowledge the following disclaimer:
    - **Under Development**: The TWAISWCF package is still under development. It should be considered as a work in progress, and its functionalities, performance, and reliability may change over time. Users are advised to regularly check for updates, bug fixes, and new releases.
    - **Misuse**: The creators and contributors of the TWAISWCF package are not responsible for any misuse of this software. The package is intended to be used responsibly and within its intended scope. Any use of this package outside of its recommended guidelines is entirely at the user's own risk.
    - **Results and Estimations**: The TWAISWCF package does not guarantee accurate or reliable results in soil-water content estimation. It is an experimental algorithm that may provide varying levels of accuracy depending on different factors such as input data quality, environmental conditions, and implementation.
    - **Real Agricultural Deployment**: The TWAISWCF package should not be deployed or used in any real agricultural setting without proper guidance and instruction from our development team. It is essential to consult with our team to understand the limitations, potential risks, and appropriate use cases of the package before considering its deployment in practical agricultural scenarios.
    By using the TWAISWCF package, you acknowledge and accept the terms of this disclaimer. The creators and contributors of the TWAISWCF package disclaim any liability for damages, losses, or consequences arising from the use or misuse of this software. Use it responsibly and with caution.

```@contents
Pages = [
    "index.md",
    "install.md",
    "outline.md",
    "preptab.md",
    "traintest.md",
    "finalsave.md", 
    "swcd.md",
    "swcfb.md",
]
```
