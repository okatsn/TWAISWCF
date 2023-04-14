
# Installation

## Install Julia

For windows user, 
- Download the [Current stable release](https://julialang.org/downloads/#current_stable_release) of julia, or get julia on [Microsoft Store](https://www.microsoft.com/store/apps/9NJNWW8PVKMN).
- Click on `julia.exe` (likely under `<USERNAME>\AppData\Local\Programs\Julia-1.8.5\bin\`), or type `julia` in windows terminal, to start [The Julia REPL](https://docs.julialang.org/en/v1/stdlib/REPL/).



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
!!! warning "Warning"
    It can but it is in general not recommended to work on the `(@1.X) julia>` environment. See the followings to learn how to generate a project and activate the project environment.
    - [Working with Environments](https://pkgdocs.julialang.org/v1/environments/)
    - [How to setup Project Environments in Julia](https://towardsdatascience.com/how-to-setup-project-environments-in-julia-ec8ae73afe9c)
    - [Create a temporary/throwaway environement](https://stackoverflow.com/questions/66897756/with-julia-is-there-a-way-to-create-a-test-temporary-throwaway-environement)


In your project environment, add [TWAISWCF](https://github.com/okatsn/TWAISWCF):

```julia-repl
(@v1.8) pkg> add TWAISWCF
```

If you'd like to import (`using`) the example dataset for SWC estimation, add [SWCExampleDatasets](https://github.com/okatsn/SWCExampleDatasets.jl):

```julia-repl
(@v1.8) pkg> add SWCExampleDatasets
```

## Keep updated to the latest version

```julia-repl
(@v1.8) pkg> up
```




