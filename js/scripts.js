document.querySelector("#calc").onclick = doCalc;

function doCalc() {
    let charClass = document.querySelector("#charClass").value;
    let charLevel = document.querySelector("#charLevel").value;
    let charStr = document.querySelector("#charStr").value;
    let charHaste = document.querySelector("#charHaste").value;
    let skillDW = document.querySelector("#skillDW").value;
    let skillDA = document.querySelector("#skillDA").value;
    let skillOff = document.querySelector("#skillOff").value;
    let skillBS = document.querySelector("#skillBS").value;
    let mhDmg = document.querySelector("#mhDmg").value;
    let mhDelay = document.querySelector("#mhDelay").value;
    let ohDmg = document.querySelector("#ohDmg").value;
    let ohDelay = document.querySelector("#ohDelay").value;
    let thBonus = document.querySelector("#thBonus").value;

    let dmgMod = getDmgMod(skillOff, charStr);
    let dmgBonus = getDmgBonus(charLevel, thBonus, charClass);
    let dwChance = getDwChance(charLevel, skillDW, charClass);
    let daChance = getDaChance(skillDA);
    let taChance = getTaChance(charLevel, skillDA, charClass);

    let mhDmgCapO = getDmgCap(charLevel, mhDmg, charClass);
    let mhMinO = getMainMin(dmgBonus);
    let mhMaxO = getMainMax(dmgMod, mhDmg, thBonus, dmgBonus);
    let mhDelayO = getWepDelay(mhDmg, mhDelay, charHaste, charLevel);
    let mhDpsO = getMainDPS(mhMinO, mhMaxO, mhDelayO);

    let ohDmgCapO = getDmgCap(charLevel, ohDmg, charClass);
    let ohMinO = getOffMin(ohDmg);
    let ohMaxO = getOffMax(ohDmg, dmgMod);
    let ohDelayO = getWepDelay(ohDmg, ohDelay, charHaste, charLevel);
    let ohDpsO = getOffDPS(ohMinO, ohMaxO, ohDelayO, dwChance);

    let ttlDpsO = getTtlDPS(charLevel, mhDpsO, ohDpsO, daChance, taChance, dwChance, skillDW, charClass);

    let maxBS = getMaxBS(skillOff, charStr, mhDmg, skillBS, charClass);

    document.querySelector("#dmgMod").value = dmgMod;
    document.querySelector("#dmgBonus").value = dmgBonus;
    document.querySelector("#dwChance").value = dwChance;
    document.querySelector("#daChance").value = daChance;
    document.querySelector("#taChance").value = taChance;

    document.querySelector("#mhDmgCapO").value = mhDmgCapO;
    document.querySelector("#mhMinO").value = mhMinO;
    document.querySelector("#mhMaxO").value = mhMaxO;
    document.querySelector("#mhDelayO").value = mhDelayO;
    document.querySelector("#mhDpsO").value = mhDpsO;

    document.querySelector("#ohDmgCapO").value = ohDmgCapO;
    document.querySelector("#ohMinO").value = ohMinO;
    document.querySelector("#ohMaxO").value = ohMaxO;
    document.querySelector("#ohDelayO").value = ohDelayO;
    document.querySelector("#ohDpsO").value = ohDpsO;

    document.querySelector("#ttlDpsO").value = ttlDpsO;

    document.querySelector("#maxBS").value = maxBS;

    function getDmgBonus(level, thBonus, charClass) {
        let bonus;

        if (level < 28) {
            bonus = 0;
        } else if (thBonus > 0) {
            bonus = thBonus;
        } else if (charClass == "Bard" || charClass == "Monk" || charClass == "Paladin" || charClass == "Ranger" ||
            charClass == "Rogue" || charClass == "Shadow Knight" || charClass == "Warrior") {
            bonus = (level - 25) / 3;
        } else {
            bonus = 0;
        }

        return Math.floor(bonus);
    }

    function getDmgMod(offenseSkill, strength) {
        let dmgMod = (parseFloat(offenseSkill) + parseFloat(strength)) / 100;
        return dmgMod;
    }

    function getWepDelay(wepDmg, wepDelay, haste, level) {
        let delay;
        haste = haste * .01;

        if (level < 31 && haste > .5) {
            haste = .5;
        } else if (level < 51 && haste > .74) {
            haste = .74;
        } else if (level < 60 && haste > .94) {
            haste = .94;
        } else if (level >= 60 && haste > 1) {
            haste = 1;
        }

        delay = wepDelay / (1 + haste);

        if (delay < 5) {
            delay = 5;
        } else if (wepDmg == 0) {
            delay = 0;
        }

        delay = Math.round(delay);
        return delay;
    }

    function getDwChance(level, dwSkill, charClass) {
        let dwChance;

        if (charClass == "Monk") {
            dwChance = (parseFloat(level) + parseFloat(dwSkill)) / 400;
        } else {
            dwChance = (parseFloat(level) + parseFloat(dwSkill)) / 500;
        }

        return dwChance.toFixed(3);
    }

    function getDaChance(daSkill) {
        let daChance = daSkill / (400 * 1.05);
        return daChance.toFixed(3);
    }

    function getTaChance(level, daSkill, charClass) {
        let taChance;

        if (level >= 60 && charClass == "Monk") {
            taChance = (daSkill / 2) / (400 * 1.05);
        } else if (level >= 60 && charClass == "Warrior") {
            taChance = (daSkill / 2) / (400 * 1.05);
        } else {
            taChance = 0;
        }

        return taChance.toFixed(3);
    }

    function getMainDPS(minDmg, maxDmg, delay) {
        let dps;

        dps = ((minDmg + maxDmg) / 2) / (delay * .1);
        return dps.toFixed(3);
    }

    function getOffDPS(minDmg, maxDmg, delay, dwChance) {
        let dps;

        dps = (((minDmg + maxDmg) / 2) / (delay * .1)) * dwChance;

        if (minDmg == 0) {
            dps = 0;
        }

        return dps.toFixed(3);
    }

    function getTtlDPS(level, mhDPS, ohDPS, daChance, taChance, dwSkill, charClass) {
        let totalDPS;

        if (dwSkill < 150) {
            totalDPS = (parseFloat(mhDPS) + (parseFloat(mhDPS) * parseFloat(daChance)) + parseFloat(ohDPS));
        } else {
            totalDPS = (parseFloat(mhDPS) + (parseFloat(mhDPS) * parseFloat(daChance))) + (parseFloat(ohDPS) + (ohDPS * daChance));
        }

        if (charClass == "Warrior" || charClass == "Monk") {
            if (level >= 60) {
                totalDPS += (parseFloat(mhDPS) * parseFloat(taChance));
            }
        }

        return parseFloat(totalDPS).toFixed(3);
    }

    function getMainMax(dmgMod, damage, twoHandBonus, bonus) {
        let mainMax;

        if (dmgMod < 2) {
            dmgMod = 2;
        }

        if (twoHandBonus > 0) {
            bonus = twoHandBonus;
        }

        mainMax = (damage * dmgMod) + parseFloat(bonus);
        mainMax = Math.floor(mainMax);
        return mainMax;
    }

    function getMainMin(bonus) {
        let mainMin = bonus + 1;
        return mainMin;
    }

    function getOffMin(wepDmg) {
        let offMin;

        if (wepDmg == 0) {
            offMin = 0;
        } else {
            offMin = 1;
        }

        return offMin;
    }

    function getOffMax(ohDmg, dmgMod) {
        let offMax = ohDmg * dmgMod;
        offMax = Math.floor(offMax);
        return offMax;
    }

    function getMaxBS(offenseSkill, strength, damage, bsSkill, charClass) {
        let maxBS;
        let strUnder;
        let strOver = 0;

        if (strength > 200) {
            strUnder = 200;
            strOver = 255 - strength;
        } else {
            strUnder = strength;
        }

        maxBS = ((parseFloat(offenseSkill) + parseFloat(strUnder)) + (parseFloat(strOver) / 5)) * parseFloat(damage) * (2 + (parseFloat(bsSkill) * .02)) / 100;
        maxBS = Math.round(maxBS);

        if (charClass !== "Rogue") {
            maxBS = 0;
        }

        return maxBS;
    }

    function getDmgCap(level, wepDmg, charClass) {
        let damage;

        if (charClass == "Enchanter" || charClass == "Magician" || charClass == "Necromancer" || charClass == "Wizard") {
            if (level < 10 && wepDmg > 6) {
                damage = 6;
            } else if (level < 20 && wepDmg > 10) {
                damage = 10;
            } else if (level < 30 && wepDmg > 12) {
                damage = 12;
            } else if (level < 40 && wepDmg > 18) {
                damage = 18;
            } else if (level >= 40 && wepDmg > 20) {
                damage = 20;
            } else {
                damage = wepDmg;
            }
        }

        if (charClass == "Cleric" || charClass == "Druid" || charClass == "Shaman") {
            if (level < 10 && wepDmg > 9) {
                damage = 9;
            } else if (level < 20 && wepDmg > 12) {
                damage = 12;
            } else if (level < 30 && wepDmg > 20) {
                damage = 20;
            } else if (level < 40 && wepDmg > 26) {
                damage = 26;
            } else if (level >= 40 && wepDmg > 40) {
                damage = 40;
            } else {
                damage = wepDmg;
            }
        }

        if (charClass == "Bard" || charClass == "Monk" || charClass == "Paladin" || charClass == "Ranger" ||
            charClass == "Rogue" || charClass == "Shadow Knight" || charClass == "Warrior") {
            if (level < 10 && wepDmg > 10) {
                damage = 10;
            } else if (level < 20 && wepDmg > 20) {
                damage = 20;
            } else if (level < 30 && wepDmg > 30) {
                damage = 30;
            } else if (level < 40 && wepDmg > 60) {
                damage = 60;
            } else if (level >= 40 && wepDmg > 100) {
                damage = 100;
            } else {
                damage = wepDmg;
            }
        }

        return damage;
    }
}