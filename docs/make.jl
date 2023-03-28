using TWAISWCF, SWCForecastBase, SWCDatasets
using Documenter

DocMeta.setdocmeta!(TWAISWCF, :DocTestSetup, :(using TWAISWCF); recursive=true)

makedocs(;
    modules=[TWAISWCF, SWCForecastBase, SWCDatasets],
    authors="okatsn <okatsn@gmail.com> and contributors",
    repo="https://github.com/okatsn/TWAISWCF/blob/{commit}{path}#{line}",
    sitename="TWAISWCF",
    format=Documenter.HTML(;
        prettyurls=get(ENV, "CI", "false") == "true",
        canonical="https://okatsn.github.io/TWAISWCF",
        edit_link="main",
        assets=String[],
    ),
    pages=[
        "Introduction" => "index.md",
        "Installation" => "install.md",
        "Workflow" => [
            "Outline" => "outline.md",
            "Prepare the Table" => "preptab.md",
            "Train and Test" => "traintest.md",
            "Save" => "finalsave.md"
        ],
        "Dependencies" => [
            "SWCForecastBase.jl" => "swcfb.md",
            "SWCDatasets.jl" => "swcd.md",
        ],
    ],
)

deploydocs(;
    repo="github.com/okatsn/TWAISWCF",
    devbranch="main",
)
