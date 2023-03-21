document.querySelector("#calc").onclick = doCalc

const twoHanderBonus = [
    [1, 1, 2, 3, 3, 3, 4, 5, 5, 6, 6, 6, 8, 8, 8, 9, 9, 10, 11, 11, 11, 12, 13, 14, 16, 17, 17, 21, 21, 23, 25, 26, 28], // Row: Weapon delay 28, Cols: Levels 28-60
    [1, 1, 2, 3, 3, 3, 4, 5, 5, 6, 6, 6, 8, 8, 8, 9, 9, 10, 11, 11, 11, 12, 13, 14, 16, 17, 17, 21, 22, 23, 25, 26, 29], // Pattern follows downward delay +1
    [1, 1, 2, 3, 3, 3, 4, 5, 5, 6, 6, 6, 8, 8, 8, 9, 9, 10, 11, 11, 11, 12, 13, 14, 16, 17, 18, 21, 22, 23, 25, 27, 29], // Delay 30
    [1, 1, 2, 3, 3, 3, 4, 5, 5, 6, 6, 6, 8, 8, 8, 9, 9, 10, 11, 11, 11, 12, 13, 14, 16, 17, 18, 21, 22, 23, 25, 27, 29], // Delay 31
    [1, 1, 2, 3, 3, 3, 4, 5, 5, 6, 6, 6, 8, 8, 8, 9, 9, 10, 11, 11, 11, 12, 13, 14, 16, 17, 18, 21, 22, 24, 26, 27, 30], // Delay 32
    [1, 1, 2, 3, 3, 3, 4, 5, 5, 6, 6, 6, 8, 8, 8, 9, 9, 10, 11, 11, 11, 12, 13, 14, 16, 17, 18, 21, 22, 24, 26, 27, 30], // Delay 33
    [1, 1, 2, 3, 3, 3, 4, 5, 5, 6, 6, 6, 8, 8, 8, 9, 9, 10, 11, 11, 11, 12, 13, 14, 16, 17, 18, 22, 22, 24, 26, 28, 30], // Delay 34
    [1, 1, 2, 3, 3, 3, 4, 5, 5, 6, 6, 6, 8, 8, 8, 9, 9, 10, 11, 11, 11, 12, 13, 14, 16, 17, 18, 22, 23, 24, 26, 28, 31],
    [1, 1, 2, 3, 3, 3, 4, 5, 5, 6, 6, 6, 8, 8, 8, 9, 9, 10, 11, 11, 11, 12, 13, 14, 16, 17, 18, 22, 23, 25, 27, 28, 31],
    [1, 1, 2, 3, 3, 3, 4, 5, 5, 6, 6, 6, 8, 8, 8, 9, 9, 10, 11, 11, 11, 12, 13, 14, 16, 17, 18, 22, 23, 25, 27, 29, 31],
    [1, 1, 2, 3, 3, 3, 4, 5, 5, 6, 6, 6, 8, 8, 8, 9, 9, 10, 11, 11, 11, 12, 13, 14, 16, 17, 18, 22, 23, 25, 27, 29, 32],
    [1, 1, 2, 3, 3, 3, 4, 5, 5, 6, 6, 6, 8, 8, 8, 9, 9, 10, 11, 11, 11, 12, 13, 14, 16, 17, 18, 22, 23, 25, 27, 29, 32],
    [2, 2, 3, 4, 4, 4, 5, 6, 6, 7, 7, 7, 9, 9, 9, 10, 10, 11, 12, 12, 12, 13, 14, 16, 18, 19, 20, 24, 25, 27, 29, 31, 34],
    [2, 2, 3, 4, 4, 4, 5, 6, 6, 7, 7, 7, 9, 9, 9, 10, 10, 11, 12, 12, 12, 13, 14, 16, 18, 19, 20, 24, 25, 27, 29, 31, 34], // Delay 41
    [2, 2, 3, 4, 4, 4, 5, 6, 6, 7, 7, 7, 9, 9, 9, 10, 10, 11, 12, 12, 12, 13, 14, 16, 18, 19, 20, 24, 25, 27, 29, 31, 34],
    [4, 4, 5, 6, 6, 6, 7, 8, 8, 9, 9, 9, 11, 11, 11, 12, 12, 13, 14, 14, 14, 15, 16, 18, 20, 21, 22, 26, 27, 29, 31, 33, 37],
    [4, 4, 5, 6, 6, 6, 7, 8, 8, 9, 9, 9, 11, 11, 11, 12, 12, 13, 14, 14, 14, 15, 16, 18, 20, 21, 22, 26, 27, 29, 32, 34, 37],
    [5, 5, 6, 7, 7, 7, 8, 9, 9, 10, 10, 10, 12, 12, 12, 13, 13, 14, 15, 15, 15, 16, 17, 19, 21, 22, 23, 27, 28, 31, 33, 35, 38],
    [6, 6, 7, 8, 8, 8, 9, 10, 10, 11, 11, 11, 13, 13, 13, 14, 14, 15, 16, 16, 16, 17, 18, 20, 22, 23, 24, 28, 30, 32, 34, 36, 40],
    [6, 6, 7, 8, 8, 8, 9, 10, 10, 11, 11, 11, 13, 13, 13, 14, 14, 15, 16, 16, 16, 17, 18, 20, 22, 23, 24, 29, 30, 32, 34, 37, 40],
    [6, 6, 7, 8, 8, 8, 9, 10, 10, 11, 11, 11, 13, 13, 13, 14, 14, 15, 16, 16, 16, 17, 18, 20, 22, 23, 24, 29, 30, 32, 35, 37, 40],
    [7, 7, 8, 9, 9, 9, 10, 11, 11, 12, 12, 12, 14, 14, 14, 15, 15, 16, 17, 17, 17, 18, 19, 21, 23, 24, 25, 30, 31, 34, 36, 38, 42], // Delay 49
    [7, 7, 8, 9, 9, 9, 10, 11, 11, 12, 12, 12, 14, 14, 14, 15, 15, 16, 17, 17, 17, 18, 19, 21, 23, 24, 26, 30, 31, 34, 36, 39, 42],
    [7, 7, 8, 9, 9, 9, 10, 11, 11, 12, 12, 12, 14, 14, 14, 15, 15, 16, 17, 17, 17, 18, 19, 21, 23, 24, 26, 30, 31, 34, 36, 39, 42],
    [8, 8, 9, 10, 10, 10, 11, 12, 12, 13, 13, 13, 15, 15, 15, 16, 16, 17, 18, 18, 18, 19, 20, 22, 24, 25, 27, 31, 33, 35, 38, 40, 44],
    [8, 8, 9, 10, 10, 10, 11, 12, 12, 13, 13, 13, 15, 15, 15, 16, 16, 17, 18, 18, 18, 19, 20, 22, 24, 25, 27, 31, 33, 35, 38, 40, 44],
    [8, 8, 9, 10, 10, 10, 11, 12, 12, 13, 13, 13, 15, 15, 15, 16, 16, 17, 18, 18, 18, 19, 20, 22, 24, 26, 27, 32, 33, 36, 38, 41, 44],
    [9, 9, 10, 11, 11, 11, 12, 13, 13, 14, 14, 14, 16, 16, 16, 17, 17, 18, 19, 19, 19, 20, 21, 23, 25, 27, 28, 33, 34, 37, 39, 42, 46],
    [9, 9, 10, 11, 11, 11, 12, 13, 13, 14, 14, 14, 16, 16, 16, 17, 17, 18, 19, 19, 19, 20, 21, 23, 25, 27, 28, 33, 34, 37, 40, 42, 46],
    [9, 9, 10, 11, 11, 11, 12, 13, 13, 14, 14, 14, 16, 16, 16, 17, 17, 18, 19, 19, 19, 20, 21, 23, 25, 27, 28, 33, 34, 37, 40, 43, 46], // Delay 57
    [10, 10, 11, 12, 12, 12, 13, 14, 14, 15, 15, 15, 17, 17, 17, 18, 18, 19, 20, 20, 20, 21, 22, 24, 26, 28, 29, 34, 36, 39, 41, 44, 48],
    [10, 10, 11, 12, 12, 12, 13, 14, 14, 15, 15, 15, 17, 17, 17, 18, 18, 19, 20, 20, 20, 21, 22, 24, 26, 28, 29, 34, 36, 39, 41, 44, 48],
    [10, 10, 11, 12, 12, 12, 13, 14, 14, 15, 15, 15, 17, 17, 17, 18, 18, 19, 20, 20, 20, 21, 22, 24, 27, 28, 30, 35, 36, 39, 42, 45, 49], // Delay 60
    [14, 14, 15, 16, 16, 16, 17, 18, 18, 19, 19, 19, 21, 21, 21, 22, 22, 23, 24, 24, 24, 25, 26, 28, 31, 33, 35, 40, 42, 45, 48, 52, 56], // Delay 70
    [19, 19, 20, 21, 21, 21, 22, 23, 23, 24, 24, 24, 26, 26, 26, 27, 27, 28, 29, 29, 29, 30, 31, 34, 37, 39, 41, 47, 49, 54, 57, 61, 66], // Delay 85
    [22, 22, 23, 24, 24, 24, 25, 26, 26, 27, 27, 27, 29, 29, 29, 30, 30, 31, 32, 32, 32, 33, 34, 37, 40, 43, 45, 52, 54, 59, 62, 67, 73], // Delay 95
    [40, 40, 41, 42, 42, 42, 43, 44, 44, 45, 45, 45, 47, 47, 47, 48, 48, 49, 50, 50, 50, 51, 52, 56, 61, 65, 69, 78, 82, 89, 94, 102, 110] // Delay 150
]

function doCalc() {
    let charClass = document.querySelector("#charClass").value
    let charLevel = Number(document.querySelector("#charLevel").value)
    let charStr = Number(document.querySelector("#charStr").value)
    let charHaste = Number(document.querySelector("#charHaste").value)
    let skillDW = Number(document.querySelector("#skillDW").value)
    let skillDA = Number(document.querySelector("#skillDA").value)
    let skillOff = Number(document.querySelector("#skillOff").value)
    let skillBS = Number(document.querySelector("#skillBS").value)
    let mhDmg = Number(document.querySelector("#mhDmg").value)
    let mhDelay = Number(document.querySelector("#mhDelay").value)
    let ohDmg = Number(document.querySelector("#ohDmg").value)
    let ohDelay = Number(document.querySelector("#ohDelay").value)

    let dmgMod = Number(getDmgMod())
    let dmgBonus = Number(getDmgBonus())
    let hasteCap = Number(getHasteCap())
    let dwChance = Number(getDwChance())
    let daChance = Number(getDaChance())
    let taChance = Number(getTaChance())

    let mhDmgCapO = Number(getDmgCap(mhDmg))
    let mhMinO = Number(getMainMin())
    let mhMaxO = Number(getMainMax())
    let mhDelayO = Number(getWepDelay(mhDmg, mhDelay))
    let mhDpsO = Number(getMainDPS())

    let ohDmgCapO = Number(getDmgCap(ohDmg))
    let ohMinO = Number(getOffMin())
    let ohMaxO = Number(getOffMax())
    let ohDelayO = Number(getWepDelay(ohDmg, ohDelay))
    let ohDpsO = Number(getOffDPS())

    let ttlDpsO = Number(getTtlDPS())

    let maxBS = Number(getMaxBS())

    document.querySelector("#dmgMod").value = dmgMod
    document.querySelector("#dmgBonus").value = dmgBonus
    document.querySelector('#hasteCap').value = `${(hasteCap * 100)}%`
    document.querySelector("#dwChance").value = `${(dwChance * 100).toFixed(2)}%`
    document.querySelector("#daChance").value = `${(daChance * 100).toFixed(2)}%`
    document.querySelector("#taChance").value = `${(taChance * 100).toFixed(2)}%`

    document.querySelector("#mhDmgCapO").value = mhDmgCapO
    document.querySelector("#mhMinO").value = mhMinO
    document.querySelector("#mhMaxO").value = mhMaxO
    document.querySelector("#mhDelayO").value = mhDelayO
    document.querySelector("#mhDpsO").value = mhDpsO

    document.querySelector("#ohDmgCapO").value = ohDmgCapO
    document.querySelector("#ohMinO").value = ohMinO
    document.querySelector("#ohMaxO").value = ohMaxO
    document.querySelector("#ohDelayO").value = ohDelayO
    document.querySelector("#ohDpsO").value = ohDpsO

    document.querySelector("#ttlDpsO").value = ttlDpsO

    document.querySelector("#maxBS").value = maxBS

    function getDmgBonus() {
        let bonus

        if (charLevel >= 28) {
            if (charClass == "Bard" || charClass == "Monk" || charClass == "Paladin" || charClass == "Ranger" ||
                charClass == "Rogue" || charClass == "Shadow Knight" || charClass == "Warrior") {
                if (ohDmg == 0 || ohDmg == '') {
                    if (mhDelay < 28) {
                        bonus = (charLevel - 25) / 3
                    } else if (mhDelay >= 28 && mhDelay <= 60) {
                        bonus = twoHanderBonus[mhDelay - 28][charLevel - 28]
                    } else if (mhDelay == 70) {
                        bonus = twoHanderBonus[mhDelay - 37][charLevel - 28]
                    } else if (mhDelay == 85) {
                        bonus = twoHanderBonus[mhDelay - 51][charLevel - 28]
                    } else if (mhDelay == 95) {
                        bonus = twoHanderBonus[mhDelay - 60][charLevel - 28]
                    } else if (mhDelay == 150) {
                        bonus = twoHanderBonus[mhDelay - 114][charLevel - 28]
                    } else {
                        alert('If delay is over 60, please use 70, 85, 95, or 150. There is no item with any other delay!')
                        bonus = 0
                    }
                } else {
                    bonus = (charLevel - 25) / 3
                }
            }
        } else {
            bonus = 0
        }

        return Math.floor(bonus)
    }

    function getDmgMod() {
        let dmgMod = (skillOff + charStr) / 100
        return dmgMod
    }

    function getWepDelay(wepDmg, wepDelay) {
        let delay
        haste = charHaste * .01

        if (wepDmg == 0 || wepDmg == '') {
            return delay = 0
        }

        if (charLevel < 31 && haste > .5) {
            haste = .5
        } else if (charLevel < 51 && haste > .74) {
            haste = .74
        } else if (charLevel < 60 && haste > .94) {
            haste = .94
        } else if (charLevel >= 60 && haste > 1) {
            haste = 1
        }

        delay = wepDelay / (1 + haste)

        if (delay < 5) {
            delay = 5
        }

        delay = Math.round(delay)
        return delay
    }

    function getHasteCap() {
        if (charLevel < 31) {
            haste = .5
        } else if (charLevel < 51) {
            haste = .74
        } else if (charLevel < 60) {
            haste = .94
        } else if (charLevel >= 60) {
            haste = 1
        }
        return haste
    }

    function getDwChance() {
        let dwChance

        if (charClass == "Monk") {
            dwChance = (charLevel + skillDW) / 400
        } else {
            dwChance = (charLevel + skillDW) / 500
        }

        return dwChance
    }

    function getDaChance() {
        let daChance = skillDA / (400 * 1.05)

        if (charClass == 'Bard') {
            daChance = 0
        }
        
        return daChance
    }

    function getTaChance() {
        let taChance

        if (charLevel >= 60 && charClass == "Monk") {
            taChance = (skillDA / 2) / (400 * 1.05)
        } else if (charLevel >= 60 && charClass == "Warrior") {
            taChance = (skillDA / 2) / (400 * 1.05)
        } else {
            taChance = 0
        }

        return taChance
    }

    function getMainDPS() {
        let dps

        dps = ((mhMinO + mhMaxO) / 2) / (mhDelayO * .1)
        return dps.toFixed(2)
    }

    function getOffDPS() {
        let dps

        dps = (((ohMinO + ohMaxO) / 2) / (ohDelayO * .1)) * dwChance

        if (ohMinO == 0) {
            dps = 0
        }

        return dps.toFixed(2)
    }

    function getTtlDPS() {
        let totalDPS

        if (skillDW < 150) {
            totalDPS = mhDpsO + (mhDpsO * daChance) + ohDpsO
        } else {
            totalDPS = mhDpsO + (mhDpsO * daChance) + ohDpsO + (ohDpsO * daChance)
        }

        if (charClass == "Warrior" || charClass == "Monk") {
            if (charLevel >= 60) {
                totalDPS += mhDpsO * taChance
            }
        }

        return totalDPS.toFixed(2)
    }

    function getMainMax() {
        let mainMax

        if (dmgMod < 2) {
            dmgMod = 2
        }

        mainMax = (mhDmg * dmgMod) + dmgBonus
        return Math.floor(mainMax)
    }

    function getMainMin() {
        let mainMin = dmgBonus + 1
        return mainMin
    }

    function getOffMin() {
        let offMin

        if (ohDmg == 0 || ohDmg == '') {
            offMin = 0
        } else {
            offMin = 1
        }

        return offMin
    }

    function getOffMax() {
        let offMax

        if (ohDmg == 0 || ohDmg == '') {
            offMax = 0
        } else {
            offMax = Math.floor(ohDmg * dmgMod)
        }

        return offMax
    }

    function getMaxBS() {
        let maxBS
        let strUnder
        let strOver = 0

        if (charStr > 200) {
            strUnder = 200
            strOver = 255 - charStr
        } else {
            strUnder = charStr
        }

        maxBS = ((skillOff + strUnder) + (strOver / 5)) * mhDmg * (2 + (skillBS * .02)) / 100
        maxBS = Math.round(maxBS)

        if (charClass !== "Rogue") {
            maxBS = 0
        }

        return maxBS
    }

    function getDmgCap(wepDmg) {
        let damage

        if (charClass == "Enchanter" || charClass == "Magician" || charClass == "Necromancer" || charClass == "Wizard") {
            if (charLevel < 10 && wepDmg > 6) {
                damage = 6
            } else if (charLevel < 20 && wepDmg > 10) {
                damage = 10
            } else if (charLevel < 30 && wepDmg > 12) {
                damage = 12
            } else if (charLevel < 40 && wepDmg > 18) {
                damage = 18
            } else if (charLevel >= 40 && wepDmg > 20) {
                damage = 20
            } else {
                damage = wepDmg
            }
        }

        if (charClass == "Cleric" || charClass == "Druid" || charClass == "Shaman") {
            if (charLevel < 10 && wepDmg > 9) {
                damage = 9
            } else if (charLevel < 20 && wepDmg > 12) {
                damage = 12
            } else if (charLevel < 30 && wepDmg > 20) {
                damage = 20
            } else if (charLevel < 40 && wepDmg > 26) {
                damage = 26
            } else if (charLevel >= 40 && wepDmg > 40) {
                damage = 40
            } else {
                damage = wepDmg
            }
        }

        if (charClass == "Bard" || charClass == "Monk" || charClass == "Paladin" || charClass == "Ranger" ||
            charClass == "Rogue" || charClass == "Shadow Knight" || charClass == "Warrior") {
            if (charLevel < 10 && wepDmg > 10) {
                damage = 10
            } else if (charLevel < 20 && wepDmg > 20) {
                damage = 20
            } else if (charLevel < 30 && wepDmg > 30) {
                damage = 30
            } else if (charLevel < 40 && wepDmg > 60) {
                damage = 60
            } else if (charLevel >= 40 && wepDmg > 100) {
                damage = 100
            } else {
                damage = wepDmg
            }
        }

        return damage
    }
}