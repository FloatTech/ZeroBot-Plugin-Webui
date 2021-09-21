package main

import (
    "embed"
    "fmt"
)

//go:embed dist
var Dist embed.FS



func main() {
    fmt.Println(123)
}