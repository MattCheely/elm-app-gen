module Routing exposing (Route(..), routeLink, routeTo)

import Browser.Navigation as Navigation
import Html exposing (Html, a, text)
import Html.Attributes exposing (href)
import Html.Events exposing (onClick)
import Url exposing (Url)
import Url.Builder as Builder
import Url.Parser exposing ((</>), Parser, int, map, oneOf, parse, s, string, top)


type Route
    = Home
    | NotFound
    | User Int
    | Profile
    | Review String


routePath : Route -> String
routePath route =
    case route of
        User page ->
            Builder.absolute
                [ "user", String.fromInt page ]
                []

        Profile ->
            Builder.absolute
                [ "profile" ]
                []

        Review review ->
            Builder.absolute
                [ "review", review ]
                []

        Home ->
            Builder.absolute [ "home" ] []

        NotFound ->
            Builder.absolute [ "not-found" ] []


pushRouteUrl : Route -> Navigation.Key -> Cmd msg
pushRouteUrl route key =
    Navigation.pushUrl key (routePath route)


parseRoute : Parser (Route -> a) a
parseRoute =
    oneOf
        [ map Home
            (s "home")
        , map User
            (s "user" </> int)
        , map Profile
            (s "profile")
        , map Review
            (s "review" </> string)
        ]


routeFromUrl : Url -> Route
routeFromUrl url =
    case parse parseRoute url of
        Just route ->
            route

        Nothing ->
            NotFound


routeLink : String -> ( Route, Maybe msg ) -> Html msg
routeLink text_ ( route, handler ) =
    case handler of
        Nothing ->
            a [ href (routePath route) ]
                [ text text_ ]

        Just clickMsg ->
            a [ href (routePath route), onClick clickMsg ]
                [ text text_ ]


routeTo : Navigation.Key -> Url -> Cmd msg
routeTo key url =
    let
        route =
            routeFromUrl url
    in
    pushRouteUrl route key
