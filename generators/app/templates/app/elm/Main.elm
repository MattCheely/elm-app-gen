module Main exposing (main)

import Browser exposing (sandbox)
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)


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
