
# Installation

## Install Julia

Download the [Current stable release](https://julialang.org/downloads/#current_stable_release) of julia.

On windows, install and click on `julia.exe` (likely under `<USERNAME>\AppData\Local\Programs\Julia-1.8.5\bin\`) to start [The Julia REPL](https://docs.julialang.org/en/v1/stdlib/REPL/).

## Add additional registry 

`TWAISWCF` and some of its dependencies are registered on [OkRegistry](https://github.com/okatsn/OkRegistry); thus, you have to add `OkRegistry` to your environment firstly as follows. 

Open julia REPL, switch to Pkg REPL and:

```julia-repl
(@v1.8) pkg> registry add https://github.com/okatsn/OkRegistry.git
```

!!! note "Hint"
    - Pkg comes with a REPL. Enter the Pkg REPL by pressing `]` from the Julia REPL. See [Pkg](https://docs.julialang.org/en/v1/stdlib/Pkg/) for more information.
    - Enter `←Backspace` button to switch back to julia REPL (`julia> `).



## Add `TWAISWCF`
In your project environment, add `TWAISWCF`:

```julia-repl
(@v1.8) pkg> add TWAISWCF
```

!!! note "Hint"
    It can but it is in general not recommended to work on the `(@1.X) julia>` environment. See the followings to learn how to generate a project and activate the project environment.
    - [Working with Environments](https://pkgdocs.julialang.org/v1/environments/)
    - [How to setup Project Environments in Julia](https://towardsdatascience.com/how-to-setup-project-environments-in-julia-ec8ae73afe9c)

## Keep updated to the latest version

```julia-repl
(@v1.8) pkg> up
```




