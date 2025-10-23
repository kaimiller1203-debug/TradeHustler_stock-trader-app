'use client'

import React, { memo } from 'react';
import { cn } from "@/lib/utils";
import useTradingViewWidget from "@/hooks/useTradingViewWidget";

interface TradingViewWidgetProps {
    title?: string
    scriptUrl?: string;
    config?: Record<string, unknown>;
    height?: number;
    className?: string;
}

const TradingViewWidget = ({title, scriptUrl, config, height = 600, className }: TradingViewWidgetProps)=> {
    const containerRef = useTradingViewWidget(
        scriptUrl,
        config,
        height);


    return (
        <div className="w-full">
            {title && <h3 className="inline-block border border-orange-500 rounded-lg px-4 py-2 font-semibold text-2xl text-orange-500 mb-5">{title}</h3>}
            <div className={cn('tradingview-widget-container', className)} ref={containerRef}>
                <div className="tradingview-widget-container__widget" style={{ height, width: "100%" }} />
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);
