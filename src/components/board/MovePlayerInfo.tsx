import ReactCountryFlag from "react-country-flag"
import { OneWorldPlayerInfo } from "@/lib/interface";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const maxNameLengthForSmallerFont = 16

interface MovePlayerInfoProps {
  player: OneWorldPlayerInfo
}

export function MovePlayerInfo({ player }: MovePlayerInfoProps) {
  const defaultPlayerImageFileName = `${player.last.toLowerCase()}_${player.first.toLowerCase()}.jpg`
  const name = `${player.title ? `${player.title} ` : ""}${player.last}, ${player.first}`

  return (
    <>
      <div className="flex justify-between gap-4">
        <div>
          <p style={{
            fontSize: `${name.length < maxNameLengthForSmallerFont ? 18 : 14}px`,
            lineHeight: `${name.length < maxNameLengthForSmallerFont ? 28 : 20}px`,
          }}>{name}</p>
          <div className="flex gap-1">
            <p className="text-xs">{player.rank}</p>
            {player.country && <ReactCountryFlag countryCode={player.country.toUpperCase()} />}
          </div>
          {player.affiliation && (
            <p className="text-xs text-muted-foreground overflow-clip whitespace-nowrap">
              {player.affiliation}
            </p>
          )}
        </div>
        <Avatar className="h-16 w-16 text-primary text-3xl">
          <AvatarImage src={`/images/player/${player.imageFileName ?? defaultPlayerImageFileName}`} />
          <AvatarFallback>
            {player.last.at(0)?.toUpperCase()}{player.first.at(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <p className="text-xs text-justify">{player.bio}</p>
    </>
  )
}
