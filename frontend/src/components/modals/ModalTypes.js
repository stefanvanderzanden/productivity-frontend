import React from 'react';
import TimetrackModal from './timetracks/TimetrackModal';
import SnippetModal from "./snippets/SnippetModal";
import ProjectModal from "./projects/ProjectModal";
import TicketModal from "./tickets/TicketModal";

export const MODAL_TYPES = {
    timetrack: TimetrackModal,
    snippet: SnippetModal,
    project: ProjectModal,
    ticket: TicketModal,
}

