/**
 * Corporate structure — the one place the site describes how Arbiter is put
 * together, and the one place to change when that changes.
 *
 * WHAT IS TRUE TODAY (2026-08):
 *   Arbiter is a single registered business in the Republic of Korea,
 *   사업자등록번호 414-01-72904, 대표 강다연. There is no Delaware C-corp
 *   parent, and the sectors below are not separately incorporated.
 *
 * WHAT IS INTENDED:
 *   Arbiter becomes the parent entity, and each sector is incorporated
 *   separately (C-corp or LLC) underneath it.
 *
 * Until that paperwork exists, this site does not claim it. The words
 * "C-corp", "LLC", "Inc.", "subsidiary" and "holding company" appear nowhere
 * in the public copy, for the parent or for a sector, because a company whose
 * product is verifiable evidence cannot afford to misstate its own structure
 * to the regulated firms and examiners it is selling to.
 *
 * TO FLIP THIS: when the entities are actually registered, set
 * `entitiesIncorporated` to true and fill in each sector's `entity` field in
 * lib/divisions.ts. Every string below re-derives; no component changes.
 */

export const entitiesIncorporated = false

/** How a sector describes its relationship to the parent, in body copy. */
export const relationLine = entitiesIncorporated
  ? 'An Arbiter company.'
  : 'Part of Arbiter.'

/** The group, described in one sentence. */
export const groupLine = entitiesIncorporated
  ? 'Arbiter is the parent. Each sector operates as its own company under it.'
  : 'Arbiter is the parent. Each sector runs as its own operation under one standard of proof.'

/**
 * The structural note carried on the company page. States the position
 * plainly, including the part that is still ahead, because the alternative is
 * letting a reader infer a structure that does not exist yet.
 */
export const structureNote = entitiesIncorporated
  ? 'Arbiter is the parent entity. Each sector is separately incorporated and operates under its own management, on shared decision infrastructure.'
  : 'Arbiter is one registered business today. The sectors below run as separate operations on shared decision infrastructure, and are intended to be incorporated separately as each one reaches the point of carrying its own contracts. That has not happened yet, and this page will say so until it has.'
