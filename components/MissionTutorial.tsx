'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { markTutorialComplete, saveFirstConstellation } from '../lib/tutorialProgress';
import MobileNav from './MobileNav';
import SenaLogo from './SenaLogo';
import ValenciaConstellation from './ValenciaConstellation';

type Stage =
  | 'concern'
  | 'location'
  | 'variable'
  | 'result'
  | 'reliability'
  | 'challenge-one'
  | 'challenge-two'
  | 'challenge-three'
  | 'own-verdict'
  | 'constellation'
  | 'peer-review'
  | 'peer-result'
  | 'complete';

type Choice = {
  label: string;
  detail: string;
  icon: string;
};

const concerns: Choice[] = [
  { label: 'Floods', detail: 'Too much water', icon: '≋' },
  { label: 'Wildfires', detail: 'Too dry, too long', icon: '♨' },
  { label: 'Drought', detail: 'Too little rain', icon: '☼' },
  { label: 'Storms', detail: 'Wind and heavy rain', icon: '☁' },
  { label: 'Landslides', detail: 'Soaked, unstable ground', icon: '◢' },
  { label: 'Water supply', detail: 'Reservoirs and rivers', icon: '◉' },
];

const variables: Choice[] = [
  { label: 'Water temperature', detail: 'Sea or river, measured in °C', icon: '♨' },
  { label: 'Rainiest day', detail: 'Heaviest single day of rain', icon: '☂' },
  { label: 'Total yearly rain', detail: 'All the rain that falls in a year', icon: '▤' },
  { label: 'Rainy days', detail: 'Days with measurable rain', icon: '▦' },
];

const signalOptions = [
  {
    name: 'Total rain each year',
    detail: 'Valencia city · Has rainfall changed overall?',
    values: [38, 42, 33, 48, 36, 41, 28, 44, 37, 45, 31, 39, 34, 47, 29, 40],
  },
  {
    name: 'Rainiest day of the year',
    detail: 'Poyo river basin · Are the storms getting stronger?',
    values: [34, 38, 32, 43, 37, 39, 35, 47, 42, 44, 41, 52, 48, 56, 49, 61],
  },
  {
    name: 'Rainy days',
    detail: 'Valencia city · Does it rain more often?',
    values: [42, 49, 38, 45, 40, 50, 37, 43, 39, 46, 35, 48, 38, 44, 40, 46],
  },
];

const correlationChoices = [
  'The sea off Valencia is warming Bilbao',
  'The pattern is pure coincidence',
  'Both follow a shared pattern: general warming',
];

const peerReports = [
  {
    name: 'Leire',
    initial: 'L',
    color: '#347f88',
    pValue: 'p = 0.0001 · ★',
    report: 'The sea off Valencia rises +0.48 °C per decade. Confirmed case.',
    makesSense: true,
  },
  {
    name: 'Amaru',
    initial: 'A',
    color: '#dc9a66',
    pValue: 'p = 0.44 · ☆',
    report: 'The city’s total rain seems to fall, but p = 0.44: only a lead.',
    makesSense: true,
  },
  {
    name: 'Tomás',
    initial: 'T',
    color: '#a66a1e',
    pValue: 'p = 0.46 · ★',
    report: 'The warm sea causes the storms: they rise together, p = 0.46. Confirmed.',
    makesSense: false,
  },
  {
    name: 'Noor',
    initial: 'N',
    color: '#8665cf',
    pValue: 'p = 0.007 · ★',
    report: 'Bilbao winters rise +0.87 °C per decade. Confirmed case.',
    makesSense: true,
  },
];

import React from 'react';

const stageInfo: Record<Stage, { label: string; eyebrow: string; title: string; subtitle: string; guide: React.ReactNode }> = {
  concern: {
    label: 'MISSION 00 · FIRST INVESTIGATION',
    eyebrow: 'MISSION 00 · VALENCIA',
    title: 'What worries you?',
    subtitle: 'Let’s study the rain around Valencia, hit by the DANA floods in October 2024.',
    guide: <>Hi, I’m Sen! Welcome to your <strong>first mission</strong>. Choose <strong>Floods</strong> and I’ll guide you through the investigation.</>,
  },
  location: {
    label: '2/3 · WHERE & WHEN',
    eyebrow: 'FLOODS · RAINFALL',
    title: 'Where and when?',
    subtitle: 'Pick a place, a radius and your dates.',
    guide: <>Type <strong>Valencia</strong>, then choose Valencia, Spain. I’ve locked the other settings for this tutorial.</>,
  },
  variable: {
    label: '3/3 · VARIABLE',
    eyebrow: 'FLOODS · VALENCIA',
    title: 'Choose a variable',
    subtitle: 'What do you want to measure?',
    guide: <>Tap Water temperature. We’ll use it to learn how to <strong>read a trend</strong>.</>,
  },
  result: {
    label: '1/2 · RESULT 1',
    eyebrow: 'WATER TEMPERATURE · VALENCIA',
    title: 'Here’s what we found',
    subtitle: 'Within 50 km, from 2001 to 2024.',
    guide: <>The line goes up and down each year, but look closely: the long-term trend is <strong>rising</strong>.</>,
  },
  reliability: {
    label: '2/2 · RESULT 2',
    eyebrow: 'WATER TEMPERATURE · VALENCIA',
    title: 'Could it be chance?',
    subtitle: 'Let’s check if this trend could be luck.',
    guide: <>Detectives don&apos;t trust luck! The<strong> p-value</strong> tells us how likely it is that this trend occurred by chance. You&apos;ll be using it a lot! <u>Tiny p = not luck.</u> </>,
  },
  'challenge-one': {
    label: 'CHALLENGE 1/3',
    eyebrow: 'QUICK CHALLENGE 1/3 · SIGNALS',
    title: 'Which signal really rises?',
    subtitle: 'Compare the patterns. Which rainfall signal shows a clear upward trend?',
    guide: <>Look at the sparklines and find the signal that <strong>rises over time</strong>.</>,
  },
  'challenge-two': {
    label: 'CHALLENGE 2/3',
    eyebrow: 'QUICK CHALLENGE 2/3 · EVIDENCE',
    title: 'A clue or confirmed?',
    subtitle: 'Annual rainfall has p = 0.44. Is that strong enough evidence to confirm a trend?',
    guide: <>We saw the rules about p-values. Can you remenber what they mean?</>,
  },
  'challenge-three': {
    label: 'CHALLENGE 3/3',
    eyebrow: 'QUICK CHALLENGE 3/3 · CAUSE',
    title: 'They rise together... so what?',
    subtitle: 'The sea off Valencia and the air over Bilbao, year after year.',
    guide: <>A strong relationship <strong>does not prove</strong> that one place causes change in the other.</>,
  },
  'own-verdict': {
    label: 'YOUR OWN VERDICT',
    eyebrow: 'YOUR OWN VERDICT · POYO',
    title: 'The rainiest day of each year',
    subtitle: 'The wettest day in the Poyo river basin is rising, but right at the limit (p = 0.045). Is it a clue or a confirmed case? There’s no single right answer; what counts is your reasoning.',
    guide: <>Choose the verdict you think fits the evidence, then explain your reasoning. There is <strong>no single right answer</strong>.</>,
  },
  constellation: {
    label: 'FIRST CONSTELLATION',
    eyebrow: 'MISSION 00 · FINDINGS SAVED',
    title: 'Your first constellation',
    subtitle: 'Your findings and your reasoning are saved as stars, joined into one constellation.',
    guide: <>Your findings are connected. <strong>Mission 01 is now unlocked</strong>: review the crew’s reports with me.</>,
  },
  'peer-review': {
    label: 'MISSION 01 · REVIEW',
    eyebrow: 'MISSION 01 · PEER REVIEW',
    title: 'Can you spot the faulty report?',
    subtitle: 'Review four reports from the crew. One uses incorrect reasoning in its findings.',
    guide: <>Check whether each report’s conclusion follows from its evidence. <strong>One crew member</strong> gets the reasoning wrong.</>,
  },
  'peer-result': {
    label: 'MISSION 01 · REVIEW',
    eyebrow: 'SECOND OPINION',
    title: 'You spotted the mistake!',
    subtitle: 'A shared trend does not prove cause, and p = 0.46 is not strong evidence.',
    guide: <>All four reviews make sense. Your <strong>second-opinion achievement</strong> is ready to unlock.</>,
  },
  complete: {
    label: 'MISSION 01 COMPLETE',
    eyebrow: 'SECOND OPINION · UNLOCKED',
    title: 'You found the faulty reasoning!',
    subtitle: 'You reviewed the crew’s reports and completed your first two missions.',
    guide: <>Great work! Your first constellation and peer-review achievement are <strong>ready</strong>.</>,
  },
};

const guideImageByStage: Record<Stage, string> = {
  concern: '/sena4.png',
  location: '/sena1.png',
  variable: '/SEARCH2.png',
  result: '/sena3.png',
  reliability: '/sena11.png',
  'challenge-one': '/sena5.png',
  'challenge-two': '/sena3.png',
  'challenge-three': '/sena11.png',
  'own-verdict': '/sena3.png',
  constellation: '/sena4.png',
  'peer-review': '/sena1.png',
  'peer-result': '/sena5.png',
  complete: '/sena4.png',
};

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path d="m5.5 10 3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IncorrectIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path d="m7 7 6 6m0-6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <rect x="4.5" y="8.5" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 8.5V6a3 3 0 0 1 6 0v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path d="M4 12h15m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProgressHeader({ stage }: { stage: Stage }) {
  const activeStage = ['concern', 'location', 'variable'].includes(stage)
    ? ['concern', 'location', 'variable'].indexOf(stage)
    : ['result', 'reliability'].includes(stage)
      ? ['result', 'reliability'].indexOf(stage)
      : ['challenge-one', 'challenge-two', 'challenge-three'].includes(stage)
        ? ['challenge-one', 'challenge-two', 'challenge-three'].indexOf(stage)
        : 2;
  const count = ['concern', 'location', 'variable'].includes(stage) ? 3 : ['result', 'reliability'].includes(stage) ? 2 : 3;

  return (
    <div className="flex items-center justify-between gap-2 font-mono text-[10px] tracking-wide sm:text-[11px]">
      <span className="shrink-0 text-[#12827b]">SENTINEL</span>
      <span className="text-right text-[#627a74]">{stageInfo[stage].label}</span>
      <div className="flex shrink-0 items-center gap-1" aria-label={`${activeStage + 1} de ${count}`}>
        {Array.from({ length: count }, (_, index) => (
          <span key={index} className={`h-[6px] w-5 rounded-full ${index <= activeStage ? 'bg-[#138078]' : 'bg-[#cbd9d6]'}`} />
        ))}
      </div>
    </div>
  );
}

function SentinelGuide({ message, imageSrc }: { message: ReactNode; imageSrc: string }) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      aria-live="polite"
      className="flex items-center gap-3 rounded-2xl border border-[#cbd9d6] bg-white/95 p-3 shadow-[0_4px_16px_rgba(27,48,43,0.04)] md:gap-5 md:rounded-3xl md:p-5"
    >
      <motion.div
        animate={{ y: [0, -4, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative h-16 w-16 shrink-0 md:h-20 md:w-20"
      >
        <Image src={imageSrc} alt="Sentinel, tu guía de misión" fill sizes="64px" className="object-contain" />
      </motion.div>
      <div className="min-w-0">
        <p className="font-mono text-[9px] tracking-[0.12em] text-[#c27a1b]">SENTINEL · MISSION GUIDE</p>
        <p className="mt-0.5 text-[12px] leading-[17px] text-[#526c66] md:text-[14px] md:leading-5">{message}</p>
      </div>
      <div aria-hidden="true" className="relative ml-auto h-8 w-8 shrink-0 self-end">
        <motion.span
          animate={{ scale: [0.65, 1.35], opacity: [0.5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-1 rounded-full border border-[#138078]"
        />
        <motion.span
          animate={{ scale: [0.65, 1.35], opacity: [0.35, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
          className="absolute inset-1 rounded-full border border-[#138078]"
        />
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#138078] shadow-[0_0_0_3px_rgba(19,128,120,0.12)]" />
      </div>
    </motion.aside>
  );
}

function SelectableCard({
  item,
  active,
  selected,
  locked,
  compact = false,
  onSelect,
}: {
  item: Choice;
  active: boolean;
  selected: boolean;
  locked: boolean;
  compact?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      disabled={locked}
      onClick={onSelect}
      className={`relative flex text-left transition-colors ${
        compact
          ? 'min-h-[88px] w-full items-center gap-3 rounded-[22px] border px-3.5 py-3'
          : 'min-h-[96px] flex-col items-start rounded-[22px] border p-3'
      } ${
        active
          ? 'border-[#138078] bg-[#e7f1ef] text-[#18342f]'
          : locked
            ? 'cursor-not-allowed border-[#dce5e2] bg-[#edf2f0] text-[#94a8a3]'
            : 'border-[#cbd9d6] bg-white text-[#18342f]'
      }`}
    >
      <span className={`flex shrink-0 items-center justify-center rounded-full text-[#138078] ${compact ? 'h-11 w-11 bg-[#e7f1ef] text-[23px]' : 'h-8 w-8 bg-[#e7f1ef] text-[21px]'}`}>
        {item.icon}
      </span>
      <span className={compact ? 'min-w-0 flex-1' : ''}>
        <span className={`block font-serif leading-5 text-[#18342f] ${compact ? 'text-[18px]' : 'mt-1 text-[19px]'}`}>{item.label}</span>
        <span className="block text-[11px] leading-4 text-[#657d77]">{item.detail}</span>
        {compact && <span className="mt-1 inline-flex rounded-full bg-[#f7eee2] px-2.5 py-0.5 font-mono text-[9px] text-[#a66a1e]">{item.label === 'Water temperature' ? '°C' : item.label === 'Rainiest day' ? 'mm' : item.label === 'Rainy days' ? 'DAYS' : 'mm / YEAR'}</span>}
      </span>
      <span className={`absolute right-3 top-3 ${active ? 'text-[#138078]' : 'text-[#94a8a3]'}`}>
        {selected ? <CheckIcon /> : active ? <span aria-hidden="true" className="block h-5 w-5 rounded-full border-2 border-current" /> : locked ? <LockIcon /> : null}
      </span>
    </button>
  );
}

function LocationSettings() {
  return (
    <div className="mt-3 space-y-3 opacity-55" aria-label="Opciones bloqueadas durante el tutorial">
      <div>
        <p className="mb-1 flex items-center gap-1 font-mono text-[9px] tracking-wide text-[#a66a1e]">WIDTH <LockIcon /></p>
        <div className="flex items-center gap-3">
          <div className="relative h-1.5 flex-1 rounded-full bg-[#cbd9d6]">
            <span className="absolute left-[25%] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-[3px] border-[#138078] bg-white" />
          </div>
          <span className="font-serif text-[20px]">50 km</span>
        </div>
        <div className="mt-1 flex justify-between font-mono text-[8px] text-[#627a74]">
          <span>10</span><span>50</span><span>100</span><span>250</span><span>500 km</span>
        </div>
      </div>
      <div>
        <p className="mb-1 flex items-center gap-1 font-mono text-[9px] tracking-wide text-[#a66a1e]">DATES <LockIcon /></p>
        <div className="grid grid-cols-2 gap-2">
          {['Jan 2001', 'Dec 2024'].map((date, index) => (
            <div key={date} className="rounded-2xl border border-[#cbd9d6] bg-white px-3 py-1.5">
              <span className="block font-mono text-[8px] text-[#a66a1e]">{index === 0 ? 'FROM' : 'TO'}</span>
              <span className="font-serif text-[17px]">{date}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-1.5">
          <span className="rounded-full border border-[#cbd9d6] bg-white px-2.5 py-1 text-[9px]">Last 10 years</span>
          <span className="rounded-full border border-[#cbd9d6] bg-white px-2.5 py-1 text-[9px]">Last 20 years</span>
          <span className="rounded-full bg-[#138078] px-2.5 py-1 text-[9px] text-white">All data</span>
        </div>
      </div>
    </div>
  );
}

function TrendChart() {
  const monthlyPoints = Array.from({ length: 288 }, (_, index) => {
    const x = 25 + (index / 287) * 270;
    const seasonal = Math.sin((index / 12) * Math.PI * 2) * 48;
    const trend = (index / 287) * 28;
    return `${x.toFixed(1)},${(94 - seasonal - trend).toFixed(1)}`;
  }).join(' ');

  return (
    <div className="rounded-[22px] border border-[#cbd9d6] bg-white p-3.5">
      <p className="font-mono text-[9px] tracking-wide text-[#627a74]">WATER TEMPERATURE · °C</p>
      <svg role="img" aria-label="Monthly water temperature rising over time with seasonal changes" viewBox="0 0 320 170" className="mt-2 w-full">
        {[30, 65, 100, 135].map((y, index) => (
          <g key={y}>
            <text x="0" y={y + 3} fill="#627a74" fontSize="8">{28 - index * 4}°</text>
            <line x1="24" x2="312" y1={y} y2={y} stroke="#e7eeeb" strokeWidth="1" />
          </g>
        ))}
        <polyline points={monthlyPoints} fill="none" stroke="#138078" strokeWidth="1.25" />
        <line x1="25" y1="112" x2="306" y2="94" stroke="#18342f" strokeWidth="2" strokeDasharray="5 3" />
        <text x="24" y="160" fill="#627a74" fontSize="8">2001</text>
        <text x="100" y="160" fill="#627a74" fontSize="8">2008</text>
        <text x="185" y="160" fill="#627a74" fontSize="8">2016</text>
        <text x="275" y="160" fill="#627a74" fontSize="8">2024</text>
      </svg>
      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#627a74]">
        <span className="flex items-center gap-1.5"><i className="h-[2px] w-5 bg-[#138078]" />Monthly average</span>
        <span className="flex items-center gap-1.5"><i className="w-5 border-t-2 border-dashed border-[#18342f]" />Trend</span>
      </div>
    </div>
  );
}

function ResultSummary() {
  return (
    <div className="mt-2 flex items-center rounded-[18px] bg-[#e7f1ef] p-3.5">
      <div className="flex-1">
        <p className="font-mono text-[9px] tracking-wide text-[#138078]">TREND</p>
        <p className="font-mono text-[23px] font-bold leading-7 text-[#18342f]">+0.48 °C</p>
        <p className="text-[11px] text-[#657d77]">per decade</p>
      </div>
      <div className="h-14 w-px bg-[#18342f]" />
      <div className="flex-1 pl-3.5">
        <p className="font-mono text-[9px] tracking-wide text-[#138078]">IN 24 YEARS</p>
        <p className="font-mono text-[20px] font-bold leading-7 text-[#18342f]">≈ +1.1 °C</p>
      </div>
    </div>
  );
}

function ReliabilityCard() {
  return (
    <>
    <div className="mt-3 rounded-[20px] border border-[#cbd9d6] bg-white p-3.5">
        <p className="font-mono text-[9px] tracking-wide text-[#c27a1b]">STATION RULE</p>
        <p className="mt-2 text-[12px]"><span className="font-mono">p &lt; 0.05</span><span className="mx-2 text-[#138078]">★</span>Confirmed case</p>
        <p className="mt-1 text-[12px]"><span className="font-mono">p ≥ 0.05</span><span className="mx-2 text-[#138078]">☆</span>Lead: worth a closer look</p>
      </div>
      
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-[19px] border border-[#cbd9d6] bg-white p-3">
          <p className="font-mono text-[9px] tracking-wide text-[#c27a1b]">TREND</p>
          <p className="mt-1 font-serif text-[16px]">+0.48 °C/decade</p>
        </div>
        <div className="rounded-[19px] border border-[#cbd9d6] bg-white p-3">
          <p className="font-mono text-[9px] tracking-wide text-[#c27a1b]">MARGIN 95%</p>
          <p className="mt-1 font-serif text-[16px]">0.29 – 0.61</p>
        </div>
      </div>

      <div className="mt-3 rounded-[22px] border-2 border-dashed border-[#138078] bg-white p-3.5">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[15px] tracking-wide text-[#c27a1b]">p VALUE</p>
            <p className="font-mono text-[8px] text-[#627a74]">0.05 · limit</p>
          </div>
          <p className="font-serif text-[34px] leading-none">0.0001</p>
        </div>
        <div className="relative mt-3 h-2 rounded-full bg-[#cbd9d6]">
          <div className="absolute inset-y-0 left-0 w-[16%] rounded-full bg-[#138078]" />
          <span className="absolute left-[16%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#138078] bg-white" />
          <span className="absolute left-[33%] top-[-4px] h-4 border-l-2 border-[#18342f]" />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[8px] text-[#627a74]">
          <span>you are here</span><span>1 · pure chance</span>
        </div>
        <p className="mt-2 text-[12px] leading-[18px] text-[#18342f]">
          If the sea weren’t changing, we’d see a rise like this by pure chance <strong className="text-[#138078]">1 time in 10,000.</strong>
        </p>
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-[20px] border border-[#138078] bg-[#e7f1ef] p-3.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d0e7e2] text-2xl text-[#138078]">★</span>
        <div>
          <h2 className="font-serif text-[20px] leading-5">Confirmed case</h2>
          <p className="text-[11px] text-[#657d77]">First star of your constellation</p>
        </div>
      </div>
    </>
  );
}

function SignalSparkline({ values }: { values: number[] }) {
  const points = values.map((value, index) => {
    const x = 8 + (index / (values.length - 1)) * 144;
    return `${x},${58 - value}`;
  }).join(' ');

  return (
    <svg aria-hidden="true" viewBox="0 0 160 68" className="h-[56px] w-full">
      <polyline points={points} fill="none" stroke="#66758f" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function SignalOptionCard({
  option,
  index,
  selected,
  selectionOutcome = 'neutral',
  onSelect,
}: {
  option: (typeof signalOptions)[number];
  index: number;
  selected: boolean;
  selectionOutcome?: 'neutral' | 'correct' | 'incorrect';
  onSelect: () => void;
}) {
  const selectedColor = selectionOutcome === 'incorrect'
    ? 'border-2 border-[#c27a1b] bg-[#f7eee2]'
    : 'border-2 border-[#138078] bg-[#e7f1ef]';
  const badgeColor = selected && selectionOutcome === 'incorrect'
    ? 'bg-[#c27a1b] text-white'
    : selected
      ? 'bg-[#138078] text-white'
      : 'bg-[#f3c9a7] text-[#18342f]';

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-[19px] border p-3 text-left transition-colors ${
        selected
          ? selectedColor
          : 'border-[#cbd9d6] bg-white'
      }`}
    >
      <span className="flex items-center gap-2.5">
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[12px] font-bold ${badgeColor}`}>
          {String.fromCharCode(65 + index)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[14px] font-bold leading-4">{option.name}</span>
          <span className="block text-[11px] leading-4 text-[#657d77]">{option.detail}</span>
        </span>
        {selected && (selectionOutcome === 'incorrect' ? <IncorrectIcon /> : <CheckIcon />)}
      </span>
      <SignalSparkline values={option.values} />
    </button>
  );
}

function RainfallTrendChart() {
  const values = [22, 27, 21, 33, 18, 24, 31, 26, 22, 20, 15, 29, 34, 24, 21, 37, 28, 17, 26, 42, 19, 30, 24, 45];

  return (
    <div className="mt-5 rounded-[20px] border border-[#cbd9d6] bg-white p-3">
      <div className="flex items-center justify-between font-mono text-[9px] text-[#627a74]">
        <span>DAILY RAINFALL · mm</span><span>POYO BASIN</span>
      </div>
      <svg role="img" aria-label="Annual maximum daily rainfall, with an uncertain upward trend from 2001 to 2024" viewBox="0 0 320 116" className="mt-1 w-full">
        <line x1="10" x2="310" y1="94" y2="94" stroke="#dce7e4" strokeWidth="1.5" />
        {values.map((value, index) => {
          const x = 13 + index * 12.2;
          const height = value * 1.7;
          return <rect key={index} x={x} y={94 - height} width="8.5" height={height} rx="2" fill={index === values.length - 1 ? '#138078' : '#3479ba'} />;
        })}
        <line x1="14" y1="76" x2="306" y2="38" stroke="#d66b32" strokeWidth="2.5" strokeDasharray="7 4" />
        <text x="12" y="108" fill="#627a74" fontSize="9">2001</text>
        <text x="280" y="108" fill="#627a74" fontSize="9">2024</text>
      </svg>
    </div>
  );
}

function CorrelationPlot() {
  const points = Array.from({ length: 20 }, (_, index) => {
    const noise = ((index * 17) % 17) - 8;
    return {
      x: 34 + (index / 19) * 262,
      y: 120 - (index / 19) * 82 + noise,
    };
  });

  return (
    <div className="rounded-[20px] border border-[#cbd9d6] bg-white p-3">
      <div className="flex items-center justify-between text-[11px] text-[#657d77]">
        <span>Each point = one year</span>
        <strong className="font-mono text-[#18342f]">r = 0.77 · strong</strong>
      </div>
      <svg role="img" aria-label="Scatter plot showing a strong positive relationship between Valencia sea temperature and Bilbao air temperature" viewBox="0 0 320 170" className="mt-2 w-full">
        <line x1="34" y1="145" x2="306" y2="145" stroke="#9ba9bd" strokeWidth="1.5" />
        <line x1="34" y1="145" x2="34" y2="14" stroke="#9ba9bd" strokeWidth="1.5" />
        <line x1="52" y1="130" x2="292" y2="31" stroke="#223151" strokeWidth="2" strokeDasharray="5 4" />
        {points.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r="4.3" fill="#3479ba" stroke="white" strokeWidth="1.4" />
        ))}
        <text x="106" y="163" fill="#627a74" fontSize="9">Valencia sea, warmer →</text>
        <text x="5" y="96" fill="#627a74" fontSize="9" transform="rotate(-90 12 96)">Bilbao air, warmer →</text>
      </svg>
    </div>
  );
}

export default function MissionTutorial() {
  const [stage, setStage] = useState<Stage>('concern');
  const [concern, setConcern] = useState<string | null>(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [location, setLocation] = useState<string | null>(null);
  const [variable, setVariable] = useState<string | null>(null);
  const [risingSignal, setRisingSignal] = useState<number | null>(null);
  const [secondarySignal, setSecondarySignal] = useState<number | null>(null);
  const [rainVerdict, setRainVerdict] = useState<'Lead' | 'Confirmed' | null>(null);
  const [rainReasoning, setRainReasoning] = useState('');
  const [finalAnswer, setFinalAnswer] = useState<number | null>(null);
  const [quickVerdict, setQuickVerdict] = useState<'Lead' | 'Confirmed' | null>(null);
  const [constellationSaveError, setConstellationSaveError] = useState<string | null>(null);
  const [peerReviews, setPeerReviews] = useState<Array<boolean | null>>(() => peerReports.map(() => null));
  const allReportsReviewed = peerReviews.every((answer) => answer !== null);
  const allReviewsCorrect = peerReviews.every((answer, index) => answer === peerReports[index].makesSense);

  const canContinue: Record<Stage, boolean> = {
    concern: concern !== null,
    location: location !== null,
    variable: variable !== null,
    result: true,
    reliability: true,
    'challenge-one': risingSignal === 1,
    'challenge-two': quickVerdict === 'Lead',
    'challenge-three': finalAnswer === 2,
    'own-verdict': secondarySignal === 1 && rainVerdict !== null && rainReasoning.trim().length > 0,
    constellation: true,
    'peer-review': allReportsReviewed,
    'peer-result': true,
    complete: false,
  };

  const guideMessage = stage === 'location' && /valencia/i.test(locationQuery) && !location
    ? 'Great! Now tap the highlighted suggestion: Valencia, Spain.'
    : stage === 'location' && location
      ? 'Valencia, Spain selected. Radius and dates are set for you.'
      : stage === 'concern' && concern
        ? 'Floods selected! Tap Continue and we’ll pinpoint where to investigate.'
        : stage === 'variable' && variable
          ? 'Water temperature selected. Tap Continue and let’s read the result.'
          : stage === 'challenge-one' && risingSignal !== null
            ? risingSignal === 1
              ? 'That is the clearest upward pattern. Next, let’s see how p-values help us judge evidence.'
              : 'Look for the sparkline that rises consistently from left to right.'
            : stage === 'challenge-two' && quickVerdict !== null
              ? quickVerdict === 'Lead'
                ? 'Right. p = 0.44 is above 0.05, so this is only a clue, not a confirmed trend.'
                : 'Not quite. With p = 0.44, the evidence is weak; call it a clue, not a confirmed case.'
              : stage === 'own-verdict' && secondarySignal === null
                ? 'Pick the rainiest-day signal from the Poyo river basin to see its evidence.'
                : stage === 'own-verdict' && rainVerdict !== null
                  ? rainReasoning.trim()
                    ? `Your verdict is ${rainVerdict.toLowerCase()}. Thanks for explaining how you read the evidence.`
                    : 'Now add your reasoning. Either verdict is valid if you can support it with the evidence.'
            : stage === 'challenge-three' && finalAnswer !== null
              ? finalAnswer === 2
                ? 'Exactly. Correlation is not causation: both places can share the broader warming trend.'
                  : 'A strong relationship does not show that one place causes the other to warm.'
                : stage === 'peer-review' && allReportsReviewed
                  ? allReviewsCorrect
                    ? 'Great review. You caught the causation mistake and checked the p-values.'
                    : 'Review the highlighted reports again. Check whether each p-value supports its claim.'
                  : stage === 'peer-result' && !allReviewsCorrect
                    ? 'Some reports still need another look. Compare the claim with its p-value and evidence.'
                : stageInfo[stage].guide;

  const continueTutorial = () => {
    if (!canContinue[stage]) return;

    const nextStages: Partial<Record<Stage, Stage>> = {
      concern: 'location',
      location: 'variable',
      variable: 'result',
      result: 'reliability',
      reliability: 'challenge-one',
      'challenge-one': 'challenge-two',
      'challenge-two': 'challenge-three',
      'challenge-three': 'own-verdict',
      'own-verdict': 'constellation',
      constellation: 'peer-review',
      'peer-review': 'peer-result',
      'peer-result': allReviewsCorrect ? 'complete' : 'peer-review',
    };

    const nextStage = nextStages[stage];
    if (nextStage) {
      if (stage === 'own-verdict') {
        if (!rainVerdict || !rainReasoning.trim() || secondarySignal !== 1) return;
        try {
          saveFirstConstellation(rainVerdict, rainReasoning.trim());
          setConstellationSaveError(null);
        } catch (error) {
          console.error('Could not save the Valencia constellation.', error);
          setConstellationSaveError('We couldn’t save your constellation. Check your browser storage and try again.');
          return;
        }
      }
      if (nextStage === 'complete') {
        markTutorialComplete();
      }
      setStage(nextStage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const continueLabel: Record<Stage, string> = {
    concern: 'Continue',
    location: 'Continue',
    variable: 'Continue',
    result: 'Is it reliable?',
    reliability: 'Go to the challenges',
    'challenge-one': 'View the data',
    'challenge-two': 'Check my answer',
    'challenge-three': 'Finish the challenges',
    'own-verdict': 'Save to my constellation',
    constellation: 'Unlock Mission 01',
    'peer-review': 'Send review',
    'peer-result': allReviewsCorrect ? 'Continue' : 'Review answers',
    complete: 'Complete',
  };

  const isSetup = ['concern', 'location', 'variable'].includes(stage);
  const stageStep = stageInfo[stage];
  const isComplete = stage === 'complete' || stage === 'constellation';

  return (
    <main className={`min-h-dvh ${isComplete ? 'bg-[#293453] text-[#f3f1e8]' : 'bg-[#f3f6f4] text-[#18342f]'}`}>
      <div className={`mx-auto min-h-dvh w-full max-w-[440px] px-[18px] sm:px-[21px] md:max-w-[960px] md:px-10 ${stage === 'complete' ? 'pb-10' : 'pb-[175px] md:pb-10'}`}>
        <header className="flex h-[91px] items-start justify-center pt-[25px] md:h-[110px] md:pt-[30px]">
          <SenaLogo imageSrc={isComplete ? '/loggg_0.png' : undefined} />
        </header>

        {!isComplete && !['own-verdict', 'peer-review', 'peer-result'].includes(stage) && (
          <div className="mx-auto max-w-[760px]"><ProgressHeader stage={stage} /></div>
        )}

        {stage !== 'complete' && stage !== 'constellation' && (
          <section aria-labelledby="tutorial-title" className="mx-auto mt-5 max-w-[760px] md:mt-8">
            <p className="font-mono text-[10px] tracking-wide text-[#c27a1b]">{stageStep.eyebrow}</p>
            <h1 id="tutorial-title" className="mt-1 font-serif text-[30px] leading-[1.05] tracking-[-0.035em] md:text-[42px]">
              {stageStep.title}
            </h1>
            <p className="mt-1 text-[15px] leading-5 text-[#657d77] md:mt-2 md:text-[17px] md:leading-6">{stageStep.subtitle}</p>
            <div className="mt-3 md:mt-5">
              <SentinelGuide message={guideMessage} imageSrc={guideImageByStage[stage]} />
            </div>
          </section>
        )}

        <section
          key={stage}
          aria-label={stageStep.title}
          className={`mx-auto ${isComplete ? 'mt-5 max-w-[580px] md:mt-8' : 'mt-3 max-w-[760px] md:mt-5'}`}
        >
            {stage === 'concern' && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {concerns.map((item, index) => (
                    <SelectableCard
                      key={item.label}
                      item={item}
                      active={concern === item.label || (concern === null && index === 0)}
                      selected={concern === item.label}
                      locked={index !== 0}
                      onSelect={() => setConcern(item.label)}
                    />
                  ))}
                </div>
                <button type="button" disabled className="mt-2 h-[46px] w-full cursor-not-allowed rounded-full border-2 border-dashed border-[#138078] text-[13px] font-semibold text-[#138078]/60">
                  Something else… <span className="ml-1 inline-flex align-middle"><LockIcon /></span>
                </button>
              </>
            )}

            {stage === 'location' && (
              <>
                <label className="relative block">
                  <span className="sr-only">Search for a location</span>
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#627a74]">
                    <circle cx="10.8" cy="10.8" r="6.8" />
                    <path d="m16 16 4 4" strokeLinecap="round" />
                  </svg>
                  <input
                    value={locationQuery}
                    onChange={(event) => {
                      setLocationQuery(event.target.value);
                      setLocation(null);
                    }}
                    placeholder="Search a place…"
                    className="h-[48px] w-full rounded-full border border-[#cbd9d6] bg-white pl-12 pr-12 text-[14px] outline-none transition focus:border-[#138078] focus:ring-2 focus:ring-[#138078]/15"
                  />
                  {locationQuery && (
                    <button
                      type="button"
                      aria-label="Clear location"
                      onClick={() => {
                        setLocationQuery('');
                        setLocation(null);
                      }}
                      className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#e7f1ef] text-[#627a74]"
                    >×</button>
                  )}
                </label>
                <p className="mb-1.5 mt-3 font-mono text-[9px] tracking-wide text-[#c27a1b]">SUGGESTIONS</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Valencia, Spain', 'Valencia, Venezuela', 'Valencia, California, US'].map((place, index) => {
                    const isTarget = index === 0;
                    const available = isTarget && /valencia/i.test(locationQuery);
                    return (
                      <button
                        key={place}
                        type="button"
                        disabled={!available}
                        onClick={() => setLocation(place)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                          location === place ? 'border-[#138078] bg-[#138078] text-white' : available ? 'border-[#138078] bg-[#e7f1ef] text-[#18342f]' : 'cursor-not-allowed border-[#dce5e2] bg-[#edf2f0] text-[#94a8a3]'
                        }`}
                      >
                        {location === place ? <CheckIcon /> : <span className="h-2 w-2 rounded-full bg-[#138078]" />}
                        {place}
                      </button>
                    );
                  })}
                </div>
                <p className="mb-1 mt-3 flex items-center gap-1 font-mono text-[9px] tracking-wide text-[#c27a1b]">OR ENTER COORDINATES <LockIcon /></p>
                <div className="grid grid-cols-2 gap-2 opacity-55">
                  {['39.4699° N', '0.3763° W'].map((coordinate, index) => (
                    <div key={coordinate} className="rounded-2xl border border-[#cbd9d6] bg-white px-3 py-1.5">
                      <span className="block font-mono text-[8px] text-[#a66a1e]">{index === 0 ? 'LAT' : 'LON'}</span>
                      <span className="font-serif text-[17px]">{coordinate}</span>
                    </div>
                  ))}
                </div>
                <LocationSettings />
              </>
            )}

            {stage === 'variable' && (
              <div className="space-y-2.5">
                {variables.map((item, index) => (
                  <SelectableCard
                    key={item.label}
                    item={item}
                    compact
                    active={variable === item.label || (variable === null && index === 0)}
                    selected={variable === item.label}
                    locked={index !== 0}
                    onSelect={() => setVariable(item.label)}
                  />
                ))}
              </div>
            )}

            {stage === 'result' && (
              <>
                <TrendChart />
                <ResultSummary />
              </>
            )}

            {stage === 'reliability' && <ReliabilityCard />}

            {stage === 'challenge-one' && (
              <>
                <p className="mb-2 font-mono text-[10px] tracking-wide text-[#138078]">
                  WHICH RAINFALL SIGNAL SHOWS A CLEAR RISE?
                </p>
                <div className="space-y-2 md:grid md:grid-cols-3 md:gap-3 md:space-y-0">
                  {signalOptions.map((option, index) => (
                    <SignalOptionCard
                      key={option.name}
                      option={option}
                      index={index}
                      selected={risingSignal === index}
                      selectionOutcome={risingSignal === index ? (index === 1 ? 'correct' : 'incorrect') : 'neutral'}
                      onSelect={() => setRisingSignal(index)}
                    />
                  ))}
                </div>
                {risingSignal !== null && (
                  <p aria-live="polite" className={`mt-2 rounded-xl p-3 text-[12px] leading-[17px] ${risingSignal === 1 ? 'bg-[#e7f1ef] text-[#18342f]' : 'bg-[#f7eee2] text-[#18342f]'}`}>
                    {risingSignal === 1
                      ? 'That is the clear upward signal. Next, you’ll make your own case from its evidence.'
                      : 'Not quite. Compare the sparklines and look for the clearest rise.'}
                  </p>
                )}
              </>
            )}

            {stage === 'challenge-two' && (
              <>
                <div className="rounded-[20px] border border-[#cbd9d6] bg-white p-4">
                  <p className="font-mono text-[9px] tracking-wide text-[#138078]">ANNUAL RAINFALL · VALENCIA</p>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <div>
                      <p className="font-serif text-[20px] leading-6">A possible downward trend</p>
                      <p className="mt-1 text-[12px] leading-[17px] text-[#657d77]">p = 0.44 · the result could easily be chance</p>
                    </div>
                    <span className="rounded-full bg-[#f7eee2] px-3 py-1 font-mono text-[10px] text-[#a66a1e]">p ≥ 0.05</span>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 font-mono text-[10px] tracking-wide text-[#138078]">HOW WOULD YOU CLASSIFY THIS?</p>
                  <div className="flex gap-2">
                    {(['Lead', 'Confirmed'] as const).map((verdict) => {
                      const selected = quickVerdict === verdict;
                      return (
                        <button
                          key={verdict}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setQuickVerdict(verdict)}
                          className={`flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border text-[13px] font-semibold transition-colors ${
                            selected
                              ? verdict === 'Lead'
                                ? 'border-2 border-[#138078] bg-[#e7f1ef] text-[#276b73]'
                                : 'border-2 border-[#c27a1b] bg-[#f7eee2] text-[#a66a1e]'
                              : 'border-[#cbd9d6] bg-white text-[#526c66]'
                          }`}
                        >
                          <span aria-hidden="true">{verdict === 'Lead' ? '☆' : '★'}</span>
                          {verdict}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {quickVerdict && (
                  <p aria-live="polite" className={`mt-2 rounded-[18px] p-3 text-[12px] leading-[17px] ${quickVerdict === 'Lead' ? 'bg-[#e7f1ef] text-[#18342f]' : 'bg-[#f7eee2] text-[#18342f]'}`}>
                    {quickVerdict === 'Lead'
                      ? 'Correct. p = 0.44 is above the 0.05 threshold, so this is a clue worth exploring, not a confirmed trend.'
                      : 'Not quite. A p-value of 0.44 is much higher than 0.05, so there is not enough evidence to confirm the trend.'}
                  </p>
                )}
              </>
            )}

            {stage === 'own-verdict' && (
              <>
                <p className="mb-2 font-mono text-[10px] tracking-wide text-[#138078]">PICK YOUR SECOND SIGNAL</p>
                <div className="space-y-2 md:grid md:grid-cols-3 md:gap-3 md:space-y-0">
                  {signalOptions.map((option, index) => (
                    <SignalOptionCard
                      key={option.name}
                      option={option}
                      index={index}
                      selected={secondarySignal === index}
                      onSelect={() => setSecondarySignal(index)}
                    />
                  ))}
                </div>
                {secondarySignal === 1 ? (
                  <>
                <RainfallTrendChart />
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {[
                    { label: 'TREND', value: '+12.5 mm', detail: 'per decade' },
                    { label: '95% MARGIN', value: '0 – 21.4', detail: 'touches zero' },
                    { label: 'P-VALUE', value: '0.045', detail: 'near the limit' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-[14px] bg-[#18342f] p-2 text-white">
                      <p className="font-mono text-[8px] tracking-wide text-[#b8d7d1]">{stat.label}</p>
                      <p className="mt-1 font-mono text-[13px] font-bold text-[#f3c9a7]">{stat.value}</p>
                      <p className="text-[9px] text-white/75">{stat.detail}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 font-mono text-[10px] tracking-wide text-[#138078]">YOUR VERDICT</p>
                  <div className="flex gap-2">
                    {(['Lead', 'Confirmed'] as const).map((verdict) => {
                      const selected = rainVerdict === verdict;
                      return (
                        <button
                          key={verdict}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setRainVerdict(verdict)}
                          className={`flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border text-[13px] font-semibold transition-colors ${
                            selected
                              ? 'border-2 border-[#138078] bg-[#e7f1ef] text-[#276b73]'
                              : 'border-[#cbd9d6] bg-white text-[#526c66]'
                          }`}
                        >
                          <span aria-hidden="true">{verdict === 'Lead' ? '☆' : '★'}</span>
                          {verdict}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {rainVerdict && (
                  <label className="mt-2 block rounded-[18px] border border-[#cbd9d6] bg-white p-3">
                    <span className="font-mono text-[9px] tracking-wide text-[#138078]">YOUR REASONING</span>
                    <textarea
                      value={rainReasoning}
                      onChange={(event) => setRainReasoning(event.target.value)}
                      rows={3}
                      placeholder="What does the p-value tell you? How does the uncertainty affect your verdict?"
                      className="mt-1 block w-full resize-y bg-transparent text-[12px] leading-[17px] text-[#526c66] outline-none placeholder:text-[#8b9b97] focus-visible:ring-2 focus-visible:ring-[#138078]/30"
                    />
                  </label>
                )}
                {!canContinue[stage] && (
                  <p className="mt-2 text-center font-mono text-[9px] tracking-wide text-[#627a74]">CHOOSE A VERDICT AND EXPLAIN YOUR REASONING</p>
                )}
                  </>
                ) : (
                  <p className="mt-2 text-center font-mono text-[9px] tracking-wide text-[#627a74]">CHOOSE THE RAINIEST DAY SIGNAL TO VIEW ITS EVIDENCE</p>
                )}
              </>
            )}

            {stage === 'challenge-three' && (
              <>
                <CorrelationPlot />
                <div className="mt-2 space-y-2">
                  {correlationChoices.map((choice, index) => {
                    const selected = finalAnswer === index;
                    const correct = index === 2;
                    return (
                      <button
                        key={choice}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setFinalAnswer(index)}
                        className={`flex min-h-[52px] w-full items-center gap-2.5 rounded-[16px] border px-3 py-2 text-left text-[12px] leading-4 transition-colors ${
                          selected
                            ? correct ? 'border-2 border-[#138078] bg-[#e7f1ef] text-[#276b73]' : 'border-2 border-[#c27a1b] bg-[#f7eee2]'
                            : 'border-[#cbd9d6] bg-white'
                        }`}
                      >
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold ${selected ? correct ? 'bg-[#138078] text-white' : 'bg-[#c27a1b] text-white' : 'bg-[#edf2f0] text-[#526c66]'}`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1">{choice}</span>
                        {selected && correct && <CheckIcon />}
                      </button>
                    );
                  })}
                </div>
                {finalAnswer !== null && (
                  <p aria-live="polite" className={`mt-2 rounded-[18px] p-3 text-[12px] leading-[18px] ${finalAnswer === 2 ? 'bg-[#e7f1ef] text-[#18342f]' : 'bg-[#f7eee2] text-[#18342f]'}`}>
                    {finalAnswer === 2
                      ? 'Exactly. These places do not cause each other to warm; both can respond to the same global trend.'
                      : 'Not quite. A correlation shows a relationship, but it does not prove that one place causes the other to warm.'}
                  </p>
                )}
              </>
            )}

            {stage === 'peer-review' && (
              <>
                <p className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-wide text-[#138078]">
                  <span>MISSION 01 · PEER REVIEW</span>
                  <span>{peerReviews.filter((answer) => answer !== null).length}/4 REPORTS</span>
                </p>
                <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
                  {peerReports.map((report, index) => {
                    const answer = peerReviews[index];
                    const isCorrect = answer === report.makesSense;
                    return (
                      <article
                        key={report.name}
                        className={`rounded-[18px] border bg-white p-3 ${
                          answer === null
                            ? 'border-[#cbd9d6]'
                            : isCorrect ? 'border-[#8bbcb5]' : 'border-2 border-[#c27a1b] bg-[#f7eee2]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: report.color }}>
                            {report.initial}
                          </span>
                          <span className="flex-1 text-[13px] font-bold">{report.name}</span>
                          <span className="font-mono text-[9px] text-[#627a74]">{report.pValue}</span>
                        </div>
                        <p className="mt-2 text-[12px] leading-[17px] text-[#39445f]">{report.report}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {([true, false] as const).map((makesSense) => {
                            const selected = answer === makesSense;
                            return (
                              <button
                                key={String(makesSense)}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => setPeerReviews((previous) => previous.map((value, reportIndex) => reportIndex === index ? makesSense : value))}
                                className={`rounded-lg border px-2 py-1 text-[10px] font-semibold transition-colors ${
                                  selected
                                    ? makesSense
                                      ? 'border-[#347f88] bg-[#e2f0ef] text-[#276b73]'
                                      : 'border-[#c27a1b] bg-[#f7eee2] text-[#a66a1e]'
                                    : 'border-[#dce5e2] bg-white text-[#657d77]'
                                }`}
                              >
                                {makesSense ? '✓ Makes sense' : '× Does not make sense'}
                              </button>
                            );
                          })}
                          {answer !== null && (
                            <span className={`ml-auto self-center font-mono text-[9px] ${isCorrect ? 'text-[#347f88]' : 'text-[#a66a1e]'}`}>
                              {isCorrect ? 'GOOD CATCH' : 'CHECK AGAIN'}
                            </span>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
                {!allReportsReviewed && (
                  <p className="mt-2 text-center font-mono text-[9px] tracking-wide text-[#627a74]">REVIEW ALL FOUR REPORTS TO CONTINUE</p>
                )}
                {allReportsReviewed && (
                  <p aria-live="polite" className={`mt-2 rounded-xl p-3 text-[12px] leading-[17px] ${allReviewsCorrect ? 'bg-[#e2f0ef] text-[#276b73]' : 'bg-[#f7eee2] text-[#a66a1e]'}`}>
                    {allReviewsCorrect
                      ? '4/4 make sense. Tomás’s report is the one that confuses correlation with cause.'
                      : 'Look again at the reports marked in amber. Check each claim against its p-value.'}
                  </p>
                )}
              </>
            )}

            {stage === 'peer-result' && (
              <div className="space-y-3">
                <div className="rounded-[22px] bg-[#dfedeb] p-4">
                  <p className="font-mono text-[9px] tracking-[0.12em] text-[#138078]">REVIEW SENT · {peerReviews.filter((answer, index) => answer === peerReports[index].makesSense).length}/4 RIGHT</p>
                  <h2 className="mt-1 font-serif text-[26px] leading-tight text-[#293453]">
                    {allReviewsCorrect ? 'You spotted it!' : 'One more careful look'}
                  </h2>
                  <p className="mt-2 text-[13px] leading-[19px] text-[#39445f]">
                    {allReviewsCorrect
                      ? 'Tomás confused correlation with cause. Two things rising together does not prove that one causes the other, and p = 0.46 is not strong evidence.'
                      : 'A convincing report needs a conclusion that matches its evidence. Revisit the reports marked below and update your review.'}
                  </p>
                </div>
                <div className={`flex items-center gap-3 rounded-[18px] border-2 p-3 ${allReviewsCorrect ? 'border-[#138078] bg-[#e7f1ef]' : 'border-[#cbd9d6] bg-white opacity-70'}`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#138078] text-xl text-white">◎</span>
                  <div>
                    <p className="font-mono text-[9px] tracking-wide text-[#276b73]">{allReviewsCorrect ? 'ACHIEVEMENT UNLOCKED' : 'ACHIEVEMENT LOCKED'}</p>
                    <p className="font-serif text-[17px] leading-5 text-[#276b73]">Second opinion</p>
                  </div>
                  {allReviewsCorrect && <CheckIcon />}
                </div>
                {!allReviewsCorrect && (
                  <div className="space-y-2">
                    {peerReports.map((report, index) => (
                      <p key={report.name} className={`rounded-xl p-2.5 text-[11px] leading-4 ${peerReviews[index] === report.makesSense ? 'bg-[#e2f0ef] text-[#276b73]' : 'bg-[#f7eee2] text-[#a66a1e]'}`}>
                        <strong>{report.name}:</strong>{' '}
                        {report.name === 'Tomás'
                          ? 'Does not make sense: a correlation is not proof of cause, and p = 0.46 is not significant.'
                          : 'Makes sense: the claim matches the evidence and its level of certainty.'}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {stage === 'constellation' && (
              <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                aria-labelledby="constellation-title"
                className="pb-4"
              >
                <p className="mt-5 font-mono text-[10px] tracking-[0.12em] text-[#b8d7d1]">{stageStep.eyebrow}</p>
                <h1 id="constellation-title" className="mt-2 font-serif text-[32px] font-bold leading-[1.05] tracking-[-0.025em] md:text-[42px]">{stageStep.title}</h1>
                <ValenciaConstellation rainVerdict={rainVerdict ?? 'Lead'} className="my-3" />
                {constellationSaveError && (
                  <p role="alert" className="rounded-xl bg-[#f7eee2] p-3 text-[12px] text-[#a66a1e]">{constellationSaveError}</p>
                )}
                <div className="mt-2 rounded-[20px] border border-[#455272] bg-[#202b49] p-4">
                  <p className="font-mono text-[9px] tracking-[0.12em] text-[#b8d7d1]">YOUR FINDINGS</p>
                  <p className="mt-2 text-[13px] leading-[19px] text-[#f3f1e8]">
                    Valencia’s sea temperature rises by +0.48 °C per decade (confirmed). For the Poyo river basin’s wettest day, you chose {rainVerdict ?? 'Lead'}: “{rainReasoning}”
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-3 rounded-[18px] border border-[#718097] bg-[#34415f] p-3 text-left text-[#f3f1e8]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3c9a7] text-xl text-[#293453]">★</span>
                  <div>
                    <p className="font-mono text-[9px] tracking-wide text-[#f3c9a7]">MISSION 01 UNLOCKED</p>
                    <p className="font-serif text-[16px]">Peer review · check the crew’s reports</p>
                  </div>
                </div>
              </motion.section>
            )}

            {stage === 'complete' && (
              <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                aria-labelledby="complete-title"
                className="pb-4"
              >
                <p className="mt-5 font-mono text-[10px] tracking-[0.12em] text-[#b8d7d1]">{stageStep.eyebrow}</p>
                <h1 id="complete-title" className="mt-2 font-serif text-[32px] font-bold leading-[1.05] tracking-[-0.025em] md:text-[42px]">{stageStep.title}</h1>
                <div className="mt-4 rounded-[20px] border border-[#455272] bg-[#202b49] p-4">
                  <p className="font-mono text-[9px] tracking-[0.12em] text-[#b8d7d1]">YOUR FIRST CONSTELLATION</p>
                  <p className="mt-2 text-[13px] leading-[19px] text-[#f3f1e8]">
                    The sea temperature is a confirmed case. Your {rainVerdict ?? 'Lead'} verdict for the Poyo river basin is saved with your reasoning: “{rainReasoning}”
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-[18px] border border-[#138078] bg-[#e7f1ef] p-3 text-left text-[#276b73]">
                  <div>
                    <p className="font-mono text-[9px] tracking-wide">ACHIEVEMENT UNLOCKED</p>
                    <p className="font-serif text-[16px]">◎ Second opinion</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 font-mono text-[10px]">+50 XP</span>
                </div>
                <div className="mt-5">
                  <p className="font-mono text-[10px] tracking-[0.12em] text-[#b8d7d1]">NOW YOU CAN CHOOSE</p>
                  <div className="mt-2 grid gap-2 md:grid-cols-2">
                    <Link href="/missions/thanks" className="block rounded-[20px] border border-[#718097] bg-[#34415f] p-4 text-[#f3f1e8] transition-transform hover:-translate-y-0.5">
                      <div className="flex items-center justify-between font-mono text-[9px] tracking-wide">
                        <span>MISSION 02</span><span className="text-[#f3c9a7]">COMING SOON</span>
                      </div>
                      <h2 className="mt-2 font-serif text-[20px] font-bold leading-tight">Does your city feel hotter?</h2>
                      <p className="mt-1 text-[12px] leading-[17px] text-[#d3d9e3]">Sen will guide you again. This time, you’ll choose the zone.</p>
                      <span className="mt-3 flex h-10 items-center justify-center rounded-xl border border-white/70 bg-[#f3c9a7] font-semibold text-[#293453]">Explore missions</span>
                    </Link>
                    <Link href="/missions/thanks" className="flex items-center gap-3 rounded-[18px] border border-[#718097] bg-[#f3f6f4] p-3 text-[#293453] transition-transform hover:-translate-y-0.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dfedeb] text-xl text-[#138078]">⌕</span>
                      <span className="flex-1">
                        <span className="block font-serif text-[16px] font-bold leading-5">Free investigation</span>
                        <span className="block text-[11px] leading-4 text-[#657d77]">Explore without a guide</span>
                      </span>
                      <span aria-hidden="true" className="text-xl text-[#138078]">›</span>
                    </Link>
                  </div>
                </div>
              </motion.section>
            )}
        </section>

        {stage !== 'complete' && (
          <div className={`fixed bottom-[82px] left-1/2 z-40 w-[calc(100%-36px)] max-w-[398px] -translate-x-1/2 bg-gradient-to-t ${isComplete ? 'from-[#293453] via-[#293453]/95' : 'from-[#f3f6f4] via-[#f3f6f4]/95'} to-transparent pb-1 pt-3 sm:w-[calc(100%-42px)] md:static md:mx-auto md:mt-6 md:w-full md:max-w-[760px] md:translate-x-0 md:bg-none md:pb-8 md:pt-0`}>
            <button
              type="button"
              disabled={!canContinue[stage]}
              onClick={continueTutorial}
              className={`flex h-[52px] w-full items-center justify-center gap-3 rounded-full text-[14px] font-bold transition-colors ${
                canContinue[stage] ? 'bg-[#138078] text-white shadow-[0_8px_20px_rgba(19,128,120,0.18)] hover:bg-[#0d6b65]' : 'cursor-not-allowed bg-[#9bc8c2] text-white/90'
              }`}
            >
              {continueLabel[stage]}
              {(!isSetup || (stage === 'concern' && concern) || (stage === 'variable' && variable)) && <ArrowIcon />}
            </button>
            {!canContinue[stage] && (
              <p className="mt-1 text-center font-mono text-[8px] tracking-wide text-[#627a74]">SENTINEL IS WAITING FOR YOUR CHOICE</p>
            )}
          </div>
        )}
      </div>
      <MobileNav locked={stage !== 'complete'} />
    </main>
  );
}
