module Main exposing (main)

import Browser exposing (sandbox)
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (class, id)
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
    { count : Int
    }


initalModel : Model
initalModel =
    { count = 0
    }



-- Update


type Msg
    = AddOne
    | SubtractOne


update : Msg -> Model -> Model
update msg model =
    case msg of
        AddOne ->
            { model | count = model.count + 1 }

        SubtractOne ->
            { model | count = model.count - 1 }



-- View


view : Model -> Html Msg
view model =
    div [ id "counter-app" ]
        [ div [ class "counter" ]
            [ text (String.fromInt model.count) ]
        , div [ class "controls" ]
            [ button [ onClick AddOne ] [ text "+1" ]
            , button [ onClick SubtractOne ] [ text "-1" ]
            ]
        ]
