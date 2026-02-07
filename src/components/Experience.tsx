"use client"

import {
  Shield,
  Brain,
  Scale,
  BriefcaseBusinessIcon,
  GraduationCapIcon,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
} from "lucide-react"

import Image from "next/image"
import React from "react"
import ReactMarkdown from "react-markdown"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* Icon Map */
/* ------------------------------------------------------------------ */

const iconMap = {
  security: Shield,
  ai: Brain,
  governance: Scale,
  business: BriefcaseBusinessIcon,
  education: GraduationCapIcon,
} as const

export type ExperiencePositionIconType = keyof typeof iconMap

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

export type ExperiencePositionItemType = {
  id: string
  title: string
  employmentPeriod: string
  employmentType?: string
  description?: string
  icon?: ExperiencePositionIconType
  skills?: string[]
  isExpanded?: boolean
}

export type ExperienceItemType = {
  id: string
  companyName: string
  companyLogo?: string
  positions: ExperiencePositionItemType[]
  isCurrentEmployer?: boolean
}

/* ------------------------------------------------------------------ */
/* Work Experience Root */
/* ------------------------------------------------------------------ */

export function WorkExperience({
  className,
  experiences,
}: {
  className?: string
  experiences: ExperienceItemType[]
}) {
  return (
    <div className={cn("bg-background px-4", className)}>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Company Block */
/* ------------------------------------------------------------------ */

export function ExperienceItem({
  experience,
}: {
  experience: ExperienceItemType
}) {
  return (
    <div className="space-y-4 py-6">

      <div className="flex items-center gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center">
          {experience.companyLogo ? (
            <Image
              src={experience.companyLogo}
              alt={experience.companyName}
              width={24}
              height={24}
              className="rounded-full"
              unoptimized
            />
          ) : (
            <span className="flex size-2 rounded-full bg-zinc-400" />
          )}
        </div>

        <h3 className="text-lg font-medium">
          {experience.companyName}
        </h3>

        {experience.isCurrentEmployer && (
          <span className="relative flex items-center justify-center">
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-emerald-500 opacity-40" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
        )}
      </div>

      <div className="relative space-y-6 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Position Block */
/* ------------------------------------------------------------------ */

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePositionItemType
}) {
  const ExperienceIcon = iconMap[position.icon || "business"]

  return (
    <Collapsible defaultOpen={position.isExpanded} asChild>
      <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">

        <CollapsibleTrigger className="group block w-full text-left">
          <div className="mb-1 flex items-center gap-3 bg-background">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <ExperienceIcon className="size-4" />
            </div>

            <h4 className="flex-1 text-base font-medium">
              {position.title}
            </h4>

            <div className="text-muted-foreground">
              <ChevronsDownUpIcon className="hidden group-data-[state=open]:block size-4" />
              <ChevronsUpDownIcon className="hidden group-data-[state=closed]:block size-4" />
            </div>
          </div>

          <div className="flex items-center gap-2 pl-9 text-sm text-muted-foreground">
            {position.employmentType && (
              <>
                <span>{position.employmentType}</span>
                <Separator orientation="vertical" className="h-4" />
              </>
            )}
            <span>{position.employmentPeriod}</span>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          {position.description && (
            <Prose className="pt-3 pl-9">
              <ReactMarkdown>{position.description}</ReactMarkdown>
            </Prose>
          )}

          {position.skills?.length && (
            <ul className="flex flex-wrap gap-2 pt-3 pl-9">
              {position.skills.map((skill, index) => (
                <li key={index}>
                  <Skill>{skill}</Skill>
                </li>
              ))}
            </ul>
          )}
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}

/* ------------------------------------------------------------------ */
/* Prose */
/* ------------------------------------------------------------------ */

function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-none font-mono text-foreground",
        "prose-a:underline prose-a:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Skill Chip */
/* ------------------------------------------------------------------ */

function Skill({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border bg-muted/50 px-2 py-1 font-mono text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
