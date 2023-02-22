# Only if it is VERY necessary and having discussion with your co-worker you may modify this file.
# References:
# https://github.com/andferrari/julia_notebook/blob/master/Dockerfile
# https://github.com/marius311/CMBLensing.jl/blob/master/Dockerfile
# https://github.com/MalteBoehm/julia_docker-compose_template/blob/main/Dockerfile

# From dockerhub get an example image that you don't need to build your linux environment from scratch
FROM jupyter/minimal-notebook:python-3.9.7
USER root


# RUN echo $("ls")
# To see where am I

ARG PROJECT_DIR=/home/jovyan/whateverisoksinceitwillbeoverwritten
## Starship configuration
# - The current building context (see docker-compose.yml) is ".." (the parent folder of Dockerfile); thus .devcontainer/starship.toml is the right directory
# - In jupyter/base-notebook, WORKDIR is switched to $HOME; in jupyter/minimal-notebook, no WORKDIR switch action. The WORKDIR in previous building seems to be void in this stage.
# - Make sure all things under /home/$NB_USER should be fix-permissions later.
COPY .devcontainer/starship.toml /home/$NB_USER/.config/starship.toml



# [Optional] Add sudo support. Omit if you don't need to install software after connecting.
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y \
        sudo \
        curl \
        bash-completion \
        lcov \
        jq \
        ghostscript \
        pdf2svg \
    && echo $NB_USER ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$NB_USER \
    && chmod 0440 /etc/sudoers.d/$NB_USER \
    && apt-get clean && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

    # ghostscript for handling eps image files
    # pdf2svg is for vscode eps-preview extension


# Install Julia
ARG VARIANT="what.ever.is.ok.since.it.will.be.overwritten.by.that.in.docker-compose.yml"
ARG JULIA_PKG_DEVDIR="this.is.into.which.dev.clones.packages."

# Set enviroment variable
# RUN export JULIA_PKG_DEVDIR=${JULIA_PKG_DEVDIR}
ENV JULIA_PKG_DEVDIR=${JULIA_PKG_DEVDIR}

# it should be defined here, despite it will overwritten by that in docker-compose.yml
RUN mkdir /opt/julia-${VARIANT} \
    && curl -L https://julialang-s3.julialang.org/bin/linux/x64/`echo ${VARIANT} | cut -d. -f 1,2`/julia-${VARIANT}-linux-x86_64.tar.gz | tar zxf - -C /opt/julia-${VARIANT} --strip=1 \
    && ln -fs /opt/julia-${VARIANT}/bin/julia /usr/local/bin/julia










# NB_USER is defined in jupyter/minimal-notebook
USER $NB_USER
WORKDIR $PROJECT_DIR





# TODO: CHECK!! use environment.yml, Project.toml and Manifest.toml to add python and julia packages
# COPY .devcontainer/environment.yml .devcontainer/Project.toml .devcontainer/Manifest.toml ${PROJECT_DIR}
# RUN conda env update --file environment.yml \
#     && rm -f environment.yml \
#     && mkdir -p ~/.julia/environments/v`echo ${VARIANT} | cut -d. -f 1,2`
#     && cp Project.toml Manifest.toml ~/.julia/environments/v`echo ${VARIANT} | cut -d. -f 1,2`/Project.toml \
#     && julia -e 'using Pkg; Pkg.instantiate(); Pkg.precompile()'

# Add python packages and add invoke shell completion
# installation of rise: equivalent to `conda install -c conda-forge rise` in bash.
#     Note that installing "rise" and other packages at the same time will give an error (not sure why), so use the new install command line to install "rise".
# jupyter_contrib_nbextensions: equivalent to `pip install jupyter_contrib_nbextensions` and `jupyter contrib nbextension install --user` in bash.
# BONUS: setting `"rise": {"scroll": true}`: Open File in vscode (Ctrl+O) and add `"rise": {"scroll": true}` in `/home/<username>/.jupyter/nbconfig/notebook.json`.
# HINT: `conda list` to see the version.
# HINT: `jupyter notebook` in bash to get the link to the notebook hosted in the virtual machine.
# TODO: write documentation in InstallJupyterLabWithoutAnaconda.md




# KEYNOTE: An known issue of pyopenssl: AttributeError: module 'lib' has no attribute 'OpenSSL_add_all_algorithms'
# - This error occurred suddenly at the beginning of 2023; container can be built successfully based on the same Dockerfile without problem previously in 2022.
# - This problem can be solved by updating pip and pyopenssl.
# See:
# - https://stackoverflow.com/questions/74981558/error-updating-python3-pip-attributeerror-module-lib-has-no-attribute-openss
# - https://stackoverflow.com/questions/73830524/attributeerror-module-lib-has-no-attribute-x509-v-flag-cb-issuer-check

# # [In the case where there is no attribute openssl](https://stackoverflow.com/questions/74980825/build-the-project-in-git-actions-using-sam-i-am-getting-new-error-attributeerr)
RUN pip install --upgrade pyopenssl
# Currently, build failed without this line. This occurs after a certain time point.
# Consider remove this line in the future.


RUN mamba install --quiet --yes \
        ipywidgets=7.6 \
        numpy=1.21 \
        pandas=1.3 \
        seaborn=0.12 \
        matplotlib=3.5 \
        scipy=1.7 \
        scikit-learn=1.0 \
        invoke=1.6 \
        pre-commit=2.16 \
        commitizen=2.20 \
        dvc-s3=2.9 \
        dvc-gdrive=2.9 \
        jupyter_contrib_nbextensions=0.5 \
    && mamba install --quiet --yes rise=5.7 \
    && mamba clean --all -f -y \
    && npm cache clean --force

# Add julia packages and precompile
# NOTE: These packages will be added under @#.# (e.g. @v1.6)
RUN julia -e 'using Pkg; Pkg.update()' \
    && julia -e '\
        using Pkg; \
        Pkg.Registry.add(RegistrySpec(url = "https://github.com/okatsn/OkRegistry.git")); \
        Pkg.add( \
            [ \
                PackageSpec(name="Revise", version="3.5"), \
                PackageSpec(name="BenchmarkTools", version="1.3"), \
                PackageSpec(name="OhMyREPL", version="0.5"), \
                PackageSpec(name="JuliaFormatter", version="1.0"), \
                PackageSpec(name="LiveServer", version="1.1"), \
                PackageSpec(name="Pluto", version="0.19"), \
                PackageSpec(name="PlutoUI", version="0.7"), \
                PackageSpec(name="DaemonMode", version="0.1"), \
            ] \
        ) \
    ' \
    && julia -e ' \
        using Pkg; \
        Pkg.add(name="IJulia"); \
        using IJulia \
    '

ENV JULIA_PROJECT=@.

# Avoid VS Code extension reinstalls
# https://code.visualstudio.com/remote/advancedcontainers/avoid-extension-reinstalls
RUN mkdir -p /home/$NB_USER/.vscode-server/extensions \
        /home/$NB_USER/.vscode-server-insiders/extensions \
    && chown -R $NB_USER \
        /home/$NB_USER/.vscode-server \
        /home/$NB_USER/.vscode-server-insiders

# Jupyter settings
RUN mkdir -p /home/$NB_USER/.jupyter/lab/user-settings/@jupyterlab/notebook-extension \
    && echo '{"codeCellConfig": {"lineNumbers": true}}' | jq\
        >> /home/$NB_USER/.jupyter/lab/user-settings/@jupyterlab/notebook-extension/tracker.jupyterlab-settings \
    && mkdir -p /home/$NB_USER/.jupyter/lab/user-settings/@jupyterlab/shortcuts-extension \
    && echo '{"shortcuts": [{"command": "runmenu:restart-and-run-all", "keys": ["Alt R"], "selector": "[data-jp-code-runner]"}]}' | jq\
        >> /home/$NB_USER/.jupyter/lab/user-settings/@jupyterlab/shortcuts-extension/shortcuts.jupyterlab-settings \
    && mkdir -p /home/$NB_USER/.jupyter/lab/user-settings/@jupyterlab/apputils-extension \
    && echo '{"modal": false}' | jq\
        >> /home/$NB_USER/.jupyter/lab/user-settings/@jupyterlab/apputils-extension/palette.jupyterlab-settings \
    && mkdir -p /home/$NB_USER/.jupyter/nbconfig \
    && echo '{"nbext_hide_incompat": false}' | jq \
        >> /home/$NB_USER/.jupyter/nbconfig/commom.json \
    && echo '{"load_extensions": {"toc2/main": true}, "rise": {"scroll": true, "enable_chalkboard": true}}' | jq \
        >> /home/$NB_USER/.jupyter/nbconfig/notebook.json

# Shell completion and alias
RUN inv --print-completion-script bash > ~/.invoke-completion.sh \
    && echo "source ~/.invoke-completion.sh" >> ~/.bashrc \
    && dvc completion -s bash | sudo tee /etc/bash_completion.d/dvc \
    && echo -e "alias juliaclient='julia --startup-file=no -e \"using DaemonMode; runargs()\"'" >> ~/.bashrc

# Install Starship
RUN sh -c "$(curl -fsSL https://starship.rs/install.sh)" -- -y \
    && echo 'eval "$(starship init bash)"' >> ~/.bashrc \
    && mkdir -p ~/.config
#    && echo -e '[conda]\nsymbol = "Conda "\nignore_base = false' > ~/.config/starship.toml
# starship settings are now all managed directly in .devcontainer/starship.toml

RUN fix-permissions /home/$NB_USER

# Pluto port
EXPOSE 1234
