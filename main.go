package main

import (
    "embed"
    "fmt"
)

//go:embed dist
var static embed.FS



func main() {
    fmt.Println(123)
}