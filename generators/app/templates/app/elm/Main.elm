module Main exposing (main)

import Browser exposing (sandbox)
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)


{-| This creates the most basic sort of Elm progam available in the
browser. No side effects like HTTP requests are available, just user
input and view rendering. For more options, see the elm/browser package
documentation @ <https://package.elm-lang.org/packages/elm/browser/latest/>
-}
main : Program () Model Msg
main =
    Browser.sandbox
        { init = initalModel
        , update = update
        , view = view
        }



-- Model


type alias Model =
    { value : Int
    }


initalModel : Model
initalModel =
    { value = 0
    }



-- Update


type Msg
    = Increment
    | Decrement


update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            { model | value = model.value + 1 }

        Decrement ->
            { model | value = model.value - 1 }



-- View


view : Model -> Html Msg
view model =
    div []
        [ div [ class "counter" ]
            [ text (String.fromInt model.value) ]
        , div [ class "controls" ]
            [ button [ onClick Increment ] [ text "+1" ]
            , button [ onClick Decrement ] [ text "-1" ]
            ]
        ]
