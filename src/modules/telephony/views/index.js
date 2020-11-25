import React from 'react';
import RouteSwitch from 'src/components/RouteSwitch';

export default function index({ routes }) {
    return (
        <div>
            <RouteSwitch routes={routes} />
            Telephony Component
        </div>
    );
}
